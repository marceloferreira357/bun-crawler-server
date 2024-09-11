import type { ScenesState } from "./types";

export const frameDetails = {
  deltaTime: 0,
  lastUpdate: Date.now(),
};

export const scenesState: ScenesState = {
  lobby: {
    players: [],
  },
};
