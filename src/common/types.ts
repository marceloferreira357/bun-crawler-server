import { Socket } from "socket.io";

export type ClientSocket = Socket;

export type ServerEvent = {
  to?: string | string[];
  event: Events;
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

export type PlayerDefaultAttributes = {
  [key in PlayerVariant]: {
    [key in PlayerGender]: {
      size: PixelSize;
    };
  };
};

export enum Events {
  DISCONNECT = "disconnect",
  PING = "ping",
  PLAYER_MOVEMENT = "player_movement",
  SERVER_FULL = "server_full",
  PONG = "pong",
  UPDATE_SCENE = "update_scene",
}

export type ScenesState = {
  [key in SceneVariant]: {
    players: Player[];
  };
};
