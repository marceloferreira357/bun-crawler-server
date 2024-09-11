import { frameDetails, scenesState } from "../common/globalState";
import { updateLobby } from "./scenes/lobby";
import { serverEmit } from "./webSocket";

export const gameLoop = () => {
  const now = Date.now();
  frameDetails.deltaTime = now - frameDetails.lastUpdate;
  frameDetails.lastUpdate = now;

  if (scenesState.lobby.players.length > 0) {
    updateLobby();
    serverEmit({
      event: "update_scene",
      args: ["lobby", scenesState.lobby.players],
    });
  }

  const frameInterval = 1000 / Number(process.env.MAX_FPS);
  setTimeout(gameLoop, frameInterval);
};
