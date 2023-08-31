import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import dbClient from "./dbClient";

import * as dotenv from "dotenv";
import SocketManager from "./SocketManager";
import { checkForRealtimeUpdates } from "./datasources/auckland/realtimePolling";
dotenv.config();

const POLLING_INTERVAL = parseInt(process.env.POLLING_INTERVAL) || 10000; // poll every 10 seconds if not specified in env

// Setup Express
const app = express();
const port = process.env.PORT || 3000;

// Use CORS so we can deal with the client and server running on different hosts.
app.use(cors());

// Setup body-parser
app.use(express.json());

// Setup our routes.
import routes from "./routes";
app.use("/", routes);

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
      POLLING_INTERVAL
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
