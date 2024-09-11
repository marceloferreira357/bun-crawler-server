import { scenesState } from "../../common/globalState";
import { movePlayer } from "../player";

export const updateLobby = () => {
  for (const player of scenesState.lobby.players) {
    if (player) {
      let playerTargetPosition = player.position;

      if (player.isMoving) {
        playerTargetPosition = movePlayer(player);
      }

      player.position = { ...playerTargetPosition };
    }
  }
};
