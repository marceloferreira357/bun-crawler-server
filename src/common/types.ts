import { Socket } from "socket.io";

export type ClientSocket = Socket;

export type ServerEvent = {
  to?: string | string[];
  event: string;
  args?: any[];
};

export type Vector2 = {
  x: number;
  y: number;
};

export type PixelSize = {
  width: number;
  height: number;
};

export type MapVariant = "lobby";
export type SceneVariant = MapVariant;

export type Direction =
  | "up"
  | "left"
  | "down"
  | "right"
  | "up_left"
  | "up_right"
  | "down_left"
  | "down_right";

export type PlayerVariant =
  | "forest_adventurer"
  | "inferno_knight"
  | "arcane_sage"
  | "orc_marauder"
  | "ember_champion";

export type PlayerGender = "male" | "female";

export type Player = {
  id: string;
  position: Vector2;
  size: PixelSize;
  direction: Direction;
  gender: PlayerGender;
  variant: PlayerVariant;
  isMoving: boolean;
};

export type PlayerMovement = Pick<Player, "id" | "direction" | "isMoving">;

export type Events = "disconnect" | "ping" | "player_movement";

export type ScenesState = {
  [key in SceneVariant]: {
    players: Player[];
  };
};
