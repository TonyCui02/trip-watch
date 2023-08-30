import { Server, Socket } from "socket.io";
import Logger from "./utils/logger";

class SocketManager {
  private static instance: SocketManager;
  private io?: Server;

  private constructor() {
    // Constructor is empty; initialization of io is deferred
  }

  public static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  public initialize(server: Server) {
    if (!this.io) {
      this.io = server;
      this.setupSocketListeners();
    }
  }

  private setupSocketListeners() {
    this.io.on("connection", (socket: Socket) => {
      Logger.info(`Socket ${socket.id} connected`);

      socket.on("disconnect", () => {
        Logger.info(`Socket ${socket.id} disconnected`);
      });

      socket.on("joinRoom", (room: string) => {
        socket.join(room);
        Logger.info(`Socket ${socket.id} joined room: ${room}`);
      });

      socket.on("leaveRoom", (room: string) => {
        socket.leave(room);
        Logger.info(`Socket ${socket.id} left room: ${room}`);
      });

      // Add more event listeners here as needed
      // socket.on('customEvent', (data) => { ... });
    });
  }

  public emitToRoom(room: string, event: string, data: any) {
    this.io.to(room).emit(event, data);
  }

  public getConnectedClientsCount(): number {
    return this.io.engine.clientsCount;
  }
}

export default SocketManager;
