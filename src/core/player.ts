import { frameDetails, scenesState } from "../common/globalState";
import type {
  ClientSocket,
  Direction,
  Player,
  SceneVariant,
} from "../common/types";

export const setIsPlayerMoving = (
  socket: ClientSocket,
  scene: SceneVariant,
  direction: Direction,
  isMoving: boolean
) => {
  scenesState[scene].players = scenesState[scene].players.map((player) => ({
    ...player,
    direction: player.id === socket.id ? direction : player.direction,
    isMoving: player.id === socket.id ? isMoving : player.isMoving,
  }));
};

export const movePlayer = (player: Player) => {
  const { deltaTime } = frameDetails;

  const velocity = 0.4 * deltaTime;

  const playerTargetPosition = {
    ...player.position,
  };

  if (player.direction === "up") {
    playerTargetPosition.y -= velocity;
  }
  if (player.direction === "down") {
    playerTargetPosition.y += velocity;
  }
  if (player.direction === "left") {
    playerTargetPosition.x -= velocity;
  }
  if (player.direction === "right") {
    playerTargetPosition.x += velocity;
  }
  if (player.direction === "up_left") {
    playerTargetPosition.y -= velocity;
    playerTargetPosition.x -= velocity;
  }
  if (player.direction === "up_right") {
    playerTargetPosition.y -= velocity;
    playerTargetPosition.x += velocity;
  }
  if (player.direction === "down_left") {
    playerTargetPosition.y += velocity;
    playerTargetPosition.x -= velocity;
  }
  if (player.direction === "down_right") {
    playerTargetPosition.y += velocity;
    playerTargetPosition.x += velocity;
  }

  return playerTargetPosition;
};
