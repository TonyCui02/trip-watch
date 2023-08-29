import { useEffect, useState } from "react";
import BaseMap from "../components/BaseMap";
import Collapsible from "../components/Collapsible";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

export default function MapPage() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messagesReceived, setMessagesReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesReceived(data.message);
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
            onClick={joinRoom}
          >
            Join Room
          </button>
          <input
            placeholder="Message..."
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            className="bg-purple-200 hover:bg-purple-300 text-neutral-800 font-bold py-2 px-4 rounded mr-2 text-sm"
            onClick={sendMessage}
          >
            Send Message
          </button>
          <h1>Message received: </h1>
          <p>{messagesReceived}</p>
        </div>
      </Collapsible>
      <BaseMap />
    </>
  );
}
