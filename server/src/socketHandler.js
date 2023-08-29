// socketHandler.ts
const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);

    console.log(socket.client.conn.server.clientsCount + " users connected");

    socket.on("join_room", (data) => {
      socket.join(data);
    });

    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", function () {
      console.log(`user disconnected: ${socket.id}`);
      console.log(socket.client.conn.server.clientsCount + " users connected");
    });
  });
};
export default socketHandler;
