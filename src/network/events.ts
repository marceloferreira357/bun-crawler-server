import { logger } from "../common/logger";
import type { ClientSocket } from "../common/types";
import { setIsPlayerMoving } from "../core/player";
import {
  addPlayerToScene,
  getPlayerScene,
  removePlayerFromScene,
} from "../core/scenes/scene";
import { isServerFull, serverEmit } from "../core/webSocket";

export const handleOnConnectEvent = async (socket: ClientSocket) => {
  const disconnectPlayer = await isServerFull();
  if (disconnectPlayer) {
    logger.warn(`Server is full, disconnecting player: ${socket.id}`);
    serverEmit({
      to: socket.id,
      event: "server_full",
    });
    return;
  }

  addPlayerToScene(socket, "lobby");
  logger.info(`A player connected: ${socket.id}`);
};

export const handleOnDisconnectEvent = (socket: ClientSocket) => {
  socket.on("disconnect", () => {
    const scene = getPlayerScene(socket);
    removePlayerFromScene(socket, scene);
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

export const handleOnPlayerMovementEvent = (socket: ClientSocket) => {
  socket.on("player_movement", (...args: any[]) => {
    const scene = getPlayerScene(socket);
    setIsPlayerMoving(socket, scene, args[0], args[1]);
  });
};
