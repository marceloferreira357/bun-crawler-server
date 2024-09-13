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
  handleOnPlayerMessageEvent,
  handleOnPlayerMovementEvent,
} from "./events";

const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(compression({ filter: (req, _) => !req.headers["x-no-compression"] }));

const server = createServer(app);
export let io: Server;

export const serverListen = (port?: number, listeningListener?: () => void) => {
  server.listen(port, () => {
    io = new Server(server, {
      cors: {
        origin: "*",
      },
    });
    io.on("connection", (socket: ClientSocket) => {
      handleOnConnectEvent(socket);
      handleOnDisconnectEvent(socket);
      handleOnPingEvent(socket);
      handleOnPlayerMovementEvent(socket);
      handleOnPlayerMessageEvent(socket);
    });
    logger.info(`Server listening on port ${port}`);
    if (listeningListener) {
      listeningListener();
    }
  });
};
