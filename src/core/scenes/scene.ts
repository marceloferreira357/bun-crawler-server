import { scenesState } from "../../common/globalState";
import { logger } from "../../common/logger";
import type {
  ClientSocket,
  Player,
  PlayerGender,
  PlayerVariant,
  SceneVariant,
} from "../../common/types";
import { getArrayRandomValue } from "../../common/utils";
import { getDefaultPlayerSize } from "../player";

const playerVariants: PlayerVariant[] = [
  "forest_adventurer",
  "inferno_knight",
  "arcane_sage",
  "orc_marauder",
  "ember_champion",
];

const playerGenders: PlayerGender[] = ["male", "female"];

export const addPlayerToScene = async (
  socket: ClientSocket,
  scene: SceneVariant,
  player?: Player
) => {
  const gender = getArrayRandomValue(playerGenders);
  const variant = getArrayRandomValue(playerVariants);
  const size = getDefaultPlayerSize(variant, gender);

  const newPlayer: Player = player ?? {
    id: socket.id,
    direction: "right",
    gender,
    variant,
    position: {
      x: 0,
      y: 0,
    },
    size,
    isMoving: false,
  };

  await socket.join(scene);
  logger.info(`Player ${socket.id} added to scene ${scene}`);
  const { players } = scenesState[scene];
  players.push(newPlayer);
};

export const getPlayerSceneFromScenesState = (socket: ClientSocket) => {
  for (const scene in scenesState) {
    const { players } = scenesState[scene as SceneVariant];

    const playerExistsOnScene = players.some(
      (player) => player.id === socket.id
    );
    if (playerExistsOnScene) {
      return scene as SceneVariant;
    }
  }
};

export const removePlayerFromScene = async (
  socket: ClientSocket,
  scene?: SceneVariant
) => {
  if (scene) {
    const { players } = scenesState[scene];
    scenesState[scene].players = players.filter(
      (player) => player.id !== socket.id
    );
    await socket.leave(scene);
    logger.info(`Player ${socket.id} removed from scene ${scene}`);
    return scene;
  } else {
    const scene = getPlayerSceneFromScenesState(socket);
    if (!scene) {
      return;
    }
    const { players } = scenesState[scene];
    scenesState[scene].players = players.filter(
      (player) => player.id !== socket.id
    );
    logger.info(`Player ${socket.id} removed from scene ${scene}`);
    return scene;
  }
};

export const getPlayerScene = (socket: ClientSocket): SceneVariant => {
  const rooms = socket.rooms;
  const scene: SceneVariant = Array.from(rooms).find(
    (room) => room !== socket.id
  ) as SceneVariant;
  return scene;
};
