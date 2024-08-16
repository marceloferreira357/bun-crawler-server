import { logger } from "../common/logger";
import type { ClientSocket } from "../common/types";
import { serverEmit } from "./server";

export const handleOnConnectEvent = (socket: ClientSocket) => {
  logger.info(`A player connected: ${socket.id}`);
};

export const handleOnDisconnectEvent = (socket: ClientSocket) => {
  socket.on("disconnect", () => {
    logger.info(`A player disconnected: ${socket.id}`);
  });
};

export const handleOnPingEvent = (socket: ClientSocket) => {
  socket.on("ping", (...args: any[]) => {
    serverEmit({
      to: socket.id,
      event: "pong",
      args,
    });
  });
};
