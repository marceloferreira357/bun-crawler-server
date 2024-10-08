import { logger } from "../common/logger";
import {
  Events,
  type ClientSocket,
  type Direction,
  type SceneVariant,
} from "../common/types";
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
    logger.warn(`Server is full, disconnecting player ${socket.id}`);
    serverEmit({
      to: socket.id,
      event: Events.SERVER_FULL,
    });
    return;
  }

  const scene: SceneVariant = "lobby";
  addPlayerToScene(socket, scene);

  serverEmit({
    to: scene,
    event: Events.PLAYER_CONNECTED,
    args: [socket.id],
  });
  logger.info(`Player ${socket.id} connected`);
};

export const handleOnDisconnectEvent = (socket: ClientSocket) => {
  socket.on(Events.DISCONNECT, async () => {
    const scene = getPlayerScene(socket);
    const playerSceneFromScenesState = await removePlayerFromScene(
      socket,
      scene
    );
    if (playerSceneFromScenesState) {
      serverEmit({
        to: playerSceneFromScenesState,
        event: Events.PLAYER_DISCONNECTED,
        args: [socket.id],
      });
    }
    logger.warn(`Player ${socket.id} disconnected`);
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

export const handleOnPlayerMessageEvent = (socket: ClientSocket) => {
  socket.on(Events.PLAYER_MESSAGE, (...args: any[]) => {
    const scene = getPlayerScene(socket);

    const socketId = socket.id;
    const message = args[0];

    serverEmit({
      to: scene,
      event: Events.PLAYER_MESSAGE_SCENE,
      args: [socketId, message],
    });

    logger.info(`${socketId}: ${message}`);
  });
};
