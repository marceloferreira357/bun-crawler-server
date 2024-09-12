import { scenesState } from "../../common/globalState";
import { movePlayer } from "../player";

export const updateLobby = () => {
  const { players } = scenesState.lobby;

  for (const player of players) {
    if (!player) continue;

    if (player.isMoving) {
      player.position = movePlayer(player);
    }
  }
};
