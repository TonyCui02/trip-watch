import { FeedEntity, VehiclePosition } from "gtfs-realtime";
import Logger from "../../utils/logger";
import axios from "axios";
import SocketManager from "../../SocketManager";
import fs from "fs";
import path from "path"

let vehiclePositions: VehiclePosition[] = [];
const socketInstance = SocketManager.getInstance();

/**
 * Fetches all trip updates, vehicle locations, and alerts from AT, returns a list of objects
 * @param url
 */
async function fetchFromAT(url: string) {
  try {
    const config = {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.AUCKLAND_TRANSPORT_KEY,
      },
    };
    const res = await axios.get(url, config);
    if (res.status !== 200) {
      throw new Error(`Got status ${res.status} from ${url}`);
    }
    const data = res.data;
    return data.response.entity;
  } catch (err) {
    Logger.error("Error fetching from AT API", err);
  }
}

const readMockData = async () => {
  const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./mock.json"), "utf-8"));
  return data.response.entity;
};

export async function checkForRealtimeUpdates(): Promise<boolean> {
  try {
    // only poll if there are actually connected clients
    const numClients = socketInstance.getConnectedClientsCount();
    Logger.info(`There is currently ${numClients} connected clients`)
    if (numClients == 0) {
      Logger.info(
        "💻 No connected clients, cancelling request to avoid wasting api credits"
      );
      return false;
    }

    const API_URL = process.env.AT_COMBINED_FEED_API_URL;
    Logger.info("checking for realtime updates");
    const entitiesList = await fetchFromAT(API_URL);
    // const entitiesList = await readMockData(); // only uncomment this line if AT api is down

    if (entitiesList.length === 0) {
      return false;
    }

    vehiclePositions = []; // reset vehicle positions list

    for (const entity of entitiesList) {
      processEntity(entity);
    }

    socketInstance.emitToRoom(
      "vehiclePositions",
      "vehicleUpdates",
      vehiclePositions
    );
    Logger.info("Emitted updated vehicle locations");
    return true;
  } catch (err) {
    Logger.error("Error checking realtime updates", err);
  }
}

const processEntity = (data: FeedEntity): void => {
  const { id: _id, vehicle, alert: _alert } = data;

  if (vehicle != null) {
    addVehicleUpdate(vehicle);
  }
  // TODO: process trips and alerts
};

const addVehicleUpdate = (vehiclePos: VehiclePosition) => {
  // only pass through vehicles currently in an active trip to avoid rendering stationary vehicles
  if (!vehiclePos.trip) return;
  vehiclePositions.push(vehiclePos);
};
