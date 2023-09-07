import axios from "axios";
import fs from "fs";
import { VehicleFeedEntity } from "VehicleFeedEntity";
import path from "path";
import SocketManager from "../../SocketManager";
import cache from "../../store/cache";
import Logger from "../../utils/logger";
import Route from "../../db/route";
import { IVehicleRoute } from "IVehicleRoute";
import { RouteType } from "../../types/RouteType";
const vehicleTripUpdatesMap = new Map<string, VehicleFeedEntity>(); // key is vehicle id, value is an object containing a trip update and a vehicle update
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
  const data = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "./mock.json"), "utf-8")
  );
  return data.response.entity;
};

export async function checkForRealtimeUpdates(): Promise<boolean> {
  try {
    // only poll if there are actually connected clients
    const numClients = socketInstance.getConnectedClientsCount();
    Logger.info(`There is currently ${numClients} connected clients`);
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

    for (const entity of entitiesList) {
      await processEntity(entity);
    }

    const vehicleTripUpdates = Array.from(vehicleTripUpdatesMap.values());

    const filteredUpdates = vehicleTripUpdates.filter(
      (update: VehicleFeedEntity) =>
        (update.vehicle != null && update.trip_update != null) ||
        (update?.route?.routeType == RouteType.FERRY && update.vehicle != null) // ferry's don't have trip_update but we want to include them
    );

    cache.set("vehiclePositions", filteredUpdates); // update in memory cache

    socketInstance.emitToRoom(
      "vehiclePositions",
      "vehicleUpdates",
      filteredUpdates
    );
    Logger.info("Emitted updated vehicle locations");
    return true;
  } catch (err) {
    Logger.error("Error checking realtime updates", err);
  }
}

const processEntity = async (data: VehicleFeedEntity): Promise<void> => {
  const { id: _id, vehicle, alert: _alert, trip_update } = data;

  // only process entities where trip is not null for vehicle

  let vehicleId;

  if (vehicle != null) {
    vehicleId = vehicle?.vehicle?.id;
  } else if (trip_update != null) {
    vehicleId = trip_update?.vehicle?.id;
  }

  if (vehicleId == null) return;

  if (!vehicleTripUpdatesMap.has(vehicleId)) {
    vehicleTripUpdatesMap.set(vehicleId, { id: vehicleId });
  }

  if (vehicle != null) {
    const route: IVehicleRoute = await Route.findOne({
      routeId: vehicle?.trip?.route_id,
    });
    vehicleTripUpdatesMap.get(vehicleId)["route"] = route;
    vehicleTripUpdatesMap.get(vehicleId)["vehicle"] = vehicle;
  } else if (trip_update != null) {
    vehicleTripUpdatesMap.get(vehicleId)["trip_update"] = trip_update;
  }
  // TODO: process trips and alerts
};
