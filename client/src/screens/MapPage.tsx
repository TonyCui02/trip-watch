import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import BaseMap from "../components/BaseMap";
import Collapsible from "../components/Collapsible";
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const socket = io(API_URL);

export default function MapPage() {
  const [data, setData] = useState(null);

  // subscribe to vehicle updates room on component mount
  useEffect(() => {
    socket.emit("joinRoom", "vehiclePositions");
  }, []);

  // update data state whenever we get response from websocket
  useEffect(() => {
    socket.on("vehicleUpdates", (data) => {
      console.log(data);
      setData(data);
    });
  }, [socket]);

  // fetch vehicle data on component load if we didn't get latest update
  useEffect(() => {
    async function fetchLatestVehicles() {
      try {
        const response = await axios.get(
          `${API_URL}/api/vehicles`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (data == null) {
      fetchLatestVehicles();
    }
  }, []);

  return (
    <>
      <Collapsible>
        <div className="flex flex-col items-center mb-2">
          <button className="bg-purple-200 hover:bg-purple-300 text-neutral-800 font-bold py-2 px-4 rounded mr-2 text-sm">
            Send Message
          </button>
        </div>
      </Collapsible>
      <BaseMap busLocationsData={data || undefined} />
    </>
  );
}
