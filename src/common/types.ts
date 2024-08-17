import { Socket } from "socket.io";

export type ClientSocket = {} & Socket;

export type ServerEvent = {
  to?: string | string[];
  event: string;
  args?: any[];
};
