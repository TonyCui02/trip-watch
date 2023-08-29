import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import dbClient from "./dbClient";

import * as dotenv from "dotenv";
import socketHandler from "./socketHandler";
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

server.listen(port, async () => {
  try {
    await dbClient();
    socketHandler(io);
  } catch (error) {
    console.error(error);
  }
});
