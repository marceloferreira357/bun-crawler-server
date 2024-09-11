import type { ServerEvent } from "../common/types";
import { io } from "../network/webSocketServer";

export const serverEmit = ({ to, event, args = [] }: ServerEvent) => {
  if (to) {
    io.to(to).emit(event, ...args);
  } else {
    io.emit(event, ...args);
  }
};

export const serverGetClients = async (room?: string) => {
  const sockets = room ? await io.in(room).fetchSockets() : io.fetchSockets();
  return sockets;
};

export const isServerFull = async () => {
  const maxClients = Number(process.env.MAX_CLIENTS);
  const connectedClients = await serverGetClients();

  return connectedClients?.length > maxClients;
};
