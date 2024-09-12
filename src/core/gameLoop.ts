import { frameDetails, scenesState } from "../common/globalState";
import { Events, type SceneVariant } from "../common/types";
import { serverEmit } from "../network/webSocket";
import { updateLobby } from "./scenes/lobby";

export const gameLoop = () => {
  const now = Date.now();
  frameDetails.deltaTime = now - frameDetails.lastUpdate;
  frameDetails.lastUpdate = now;

  if (scenesState.lobby.players.length > 0) {
    const scene: SceneVariant = "lobby";
    updateLobby();
    serverEmit({
      to: scene,
      event: Events.UPDATE_SCENE,
      args: [scene, scenesState.lobby.players],
    });
  }

  const frameInterval = 1000 / Number(process.env.MAX_FPS);
  setTimeout(gameLoop, frameInterval);
};
