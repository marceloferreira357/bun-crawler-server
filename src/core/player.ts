import { defaultVelocity, playerDefaultAttributes } from "../common/constants";
import { frameDetails, scenesState } from "../common/globalState";
import type {
  ClientSocket,
  Direction,
  Player,
  PlayerGender,
  PlayerVariant,
  SceneVariant,
} from "../common/types";

export const setIsPlayerMoving = (
  socket: ClientSocket,
  scene: SceneVariant,
  direction: Direction,
  isMoving: boolean
) => {
  const { players } = scenesState[scene];
  for (let i = 0; i < players.length; i++) {
    if (players[i].id === socket.id) {
      players[i].direction = direction;
      players[i].isMoving = isMoving;
      break;
    }
  }
};

export const movePlayer = (player: Player) => {
  const { deltaTime } = frameDetails;
  const velocity = defaultVelocity * deltaTime;

  const { direction } = player;
  const playerTargetPosition = { ...player.position };

  switch (direction) {
    case "up":
      playerTargetPosition.y -= velocity;
      break;
    case "down":
      playerTargetPosition.y += velocity;
      break;
    case "left":
      playerTargetPosition.x -= velocity;
      break;
    case "right":
      playerTargetPosition.x += velocity;
      break;
    case "up_left":
      playerTargetPosition.y -= velocity;
      playerTargetPosition.x -= velocity;
      break;
    case "up_right":
      playerTargetPosition.y -= velocity;
      playerTargetPosition.x += velocity;
      break;
    case "down_left":
      playerTargetPosition.y += velocity;
      playerTargetPosition.x -= velocity;
      break;
    case "down_right":
      playerTargetPosition.y += velocity;
      playerTargetPosition.x += velocity;
      break;
    default:
      throw new Error("Direction doesn't exist");
  }

  return playerTargetPosition;
};

export const getDefaultPlayerSize = (
  variant: PlayerVariant,
  gender: PlayerGender
) => {
  const { size } = playerDefaultAttributes[variant][gender];
  return size;
};
