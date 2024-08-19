import { logger } from "../common/logger";
import type { ClientSocket } from "../common/types";
import { serverEmit, serverGetClients } from "./server";

export const handleOnConnectEvent = async (socket: ClientSocket) => {
  const maxClients = Number(process.env.MAX_CLIENTS);
  const connectedClients = await serverGetClients();

  if (connectedClients?.length > maxClients) {
    logger.warn(`Server is full, disconnecting player: ${socket.id}`);
    serverEmit({
      to: socket.id,
      event: "server_full",
    });
    return;
  }

  logger.info(
    `A player connected: ${socket.id}, connected clients: ${connectedClients.length}`
  );
};

export const handleOnDisconnectEvent = (socket: ClientSocket) => {
  socket.on("disconnect", async () => {
    const connectedClients = await serverGetClients();
    logger.info(
      `A player disconnected: ${socket.id}, connected clients: ${connectedClients.length}`
    );
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
