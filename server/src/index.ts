import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import dbClient from "./dbClient";

import * as dotenv from "dotenv";
import SocketInstance from "./SocketManager";
import { checkForRealtimeUpdates } from "./datasources/auckland/realtimePolling";
import SocketManager from "./SocketManager";
dotenv.config();

// Setup Express
const app = express();
const port = process.env.PORT || 3000;

// Use CORS so we can deal with the client and server running on different hosts.
app.use(cors());

// Setup body-parser
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let realtimeUpdateInterval: string | number | NodeJS.Timeout;

server.listen(port, async () => {
  try {
    console.log(`Trip Watch Server listening on port ${port}`);
    await dbClient();

    const socketManager = SocketManager.getInstance();

    socketManager.initialize(io);
    
    await checkForRealtimeUpdates();
    realtimeUpdateInterval = setInterval(
      () => checkForRealtimeUpdates(),
      10000
    );
  } catch (error) {
    console.error(error);
  }
});

server.on("close", function () {
  console.log("Stopping server...");
  console.log("Clearing interval for real time updates...");
  clearInterval(realtimeUpdateInterval);
});

process.on("SIGINT", function () {
  server.close();
});
