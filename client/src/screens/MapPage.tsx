import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import BaseMap from "../components/BaseMap";
import Collapsible from "../components/Collapsible";
const socket = io("http://192.168.1.26:3000");

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
