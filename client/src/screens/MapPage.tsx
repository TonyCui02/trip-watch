import { useEffect, useState } from "react";
import BaseMap from "../components/BaseMap";
import Collapsible from "../components/Collapsible";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

export default function MapPage() {
  const [room, setRoom] = useState("");
  const [data, setData] = useState(null);

  // subscribe to vehicle updates room on component mount
  useEffect(() => {
    socket.emit("joinRoom", "vehiclePositions");
  },[])

  // update data state whenever we get response from websocket
  useEffect(() => {
    socket.on("vehicleUpdates", (data) => {
      console.log(data)
      setData(data)
    });
  }, [socket]);

  return (
    <>
      <Collapsible>
        <div className="flex flex-col items-center mb-2">
          <input
            placeholder="Room number..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button
            className="bg-purple-200 hover:bg-purple-300 text-neutral-800 font-bold py-2 px-4 rounded mr-2 text-sm"
          >
            Send Message
          </button>
        </div>
      </Collapsible>
      <BaseMap busLocationsData={data || undefined} />
    </>
  );
}
