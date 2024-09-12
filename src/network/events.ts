import { logger } from "../common/logger";
import { Events, type ClientSocket, type Direction } from "../common/types";
import { setIsPlayerMoving } from "../core/player";
import {
  addPlayerToScene,
  getPlayerScene,
  removePlayerFromScene,
} from "../core/scenes/scene";
import { isServerFull, serverEmit } from "./webSocket";

export const handleOnConnectEvent = async (socket: ClientSocket) => {
  const disconnectPlayer = await isServerFull();
  if (disconnectPlayer) {
    logger.warn(`Server is full, disconnecting player: ${socket.id}`);
    serverEmit({
      to: socket.id,
      event: Events.SERVER_FULL,
    });
    return;
  }

  addPlayerToScene(socket, "lobby");
  logger.info(`A player connected: ${socket.id}`);
};

export const handleOnDisconnectEvent = (socket: ClientSocket) => {
  socket.on(Events.DISCONNECT, () => {
    const scene = getPlayerScene(socket);
    removePlayerFromScene(socket, scene);
    logger.info(`A player disconnected: ${socket.id}`);
  });
};

export const handleOnPingEvent = (socket: ClientSocket) => {
  socket.on(Events.PING, (...args: any[]) => {
    serverEmit({
      to: socket.id,
      event: Events.PONG,
      args,
    });
  });
};

export const handleOnPlayerMovementEvent = (socket: ClientSocket) => {
  socket.on(Events.PLAYER_MOVEMENT, (...args: any[]) => {
    const scene = getPlayerScene(socket);
    const direction: Direction = args[0];
    const isMoving: boolean = args[1];
    setIsPlayerMoving(socket, scene, direction, isMoving);
  });
};
