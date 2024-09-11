import { scenesState } from "../../common/globalState";
import type {
  ClientSocket,
  Player,
  PlayerGender,
  PlayerVariant,
  SceneVariant,
} from "../../common/types";

const getRandomPlayerVariant = (): PlayerVariant => {
  const variants: PlayerVariant[] = [
    "forest_adventurer",
    "inferno_knight",
    "arcane_sage",
    "orc_marauder",
    "ember_champion",
  ];

  const randomIndex = Math.floor(Math.random() * variants.length);
  return variants[randomIndex];
};

const getRandomPlayerGender = (): PlayerGender => {
  const variants: PlayerGender[] = ["male", "female"];

  const randomIndex = Math.floor(Math.random() * variants.length);
  return variants[randomIndex];
};

export const addPlayerToScene = async (
  socket: ClientSocket,
  scene: SceneVariant,
  player?: Player
) => {
  const newPlayer: Player = player ?? {
    id: socket.id,
    direction: "right",
    gender: getRandomPlayerGender(),
    variant: getRandomPlayerVariant(),
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 0,
      height: 0,
    },
    isMoving: false,
  };

  await socket.join(scene);
  scenesState[scene].players.push(newPlayer);
};

export const removePlayerFromScene = async (
  socket: ClientSocket,
  scene: SceneVariant
) => {
  if (scene) {
    scenesState[scene].players = scenesState[scene].players.filter(
      (player) => player.id !== socket.id
    );
    await socket.leave(scene);
  } else {
    for (const sceneState of Object.keys(scenesState)) {
      const scene = sceneState as SceneVariant;
      scenesState[scene].players = scenesState[scene].players.filter(
        (player) => player.id !== socket.id
      );
    }
  }
};

export const getPlayerScene = (socket: ClientSocket): SceneVariant => {
  const scene: SceneVariant = Array.from(socket.rooms).find(
    (room) => room !== socket.id
  )! as SceneVariant;
  return scene;
};
