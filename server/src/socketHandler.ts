import { Server } from "socket.io";

const getClientCount = (io: Server) => {
  const count = io.engine.clientsCount;
  return count;
}

// socketHandler.ts
const socketHandler = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);
    console.log(getClientCount(io) + " users connected");

    socket.on("join_room", (data) => {
      socket.join(data);
    });

    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", function () {
      console.log(`user disconnected: ${socket.id}`);
      console.log(getClientCount(io) + " users connected");
    });
  });
};
export default socketHandler;
