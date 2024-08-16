import compression from "compression";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { logger } from "../common/logger";
import type { ClientSocket } from "../common/types";
import {
  handleOnConnectEvent,
  handleOnDisconnectEvent,
  handleOnPingEvent,
} from "./events";

const app = express();

const configureMiddleware = () => {
  const corsOptions = {
    origin: "*",
  };

  app.use(cors(corsOptions));
  app.use(
    compression({ filter: (req, res) => !req.headers["x-no-compression"] })
  );
};

configureMiddleware();

const server = createServer(app);
let io: Server;

const initializeSocketIo = () => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket: ClientSocket) => {
    handleOnConnectEvent(socket);
    handleOnDisconnectEvent(socket);
    handleOnPingEvent(socket);
  });
};

export const serverListen = (port: number) => {
  server.listen(port, () => {
    initializeSocketIo();
    logger.info(`Server listening on port ${port}`);
  });
};

export const serverEmit = ({
  to,
  event,
  args = [],
}: {
  to?: string | string[];
  event: string;
  args?: any[];
}) => {
  if (to) {
    io.to(to).emit(event, ...args);
  } else {
    io.emit(event, ...args);
  }
};
