import compression from "compression";
import cors from "cors";

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { logger } from "../common/logger";
import type { ClientSocket } from "../common/types";

const app = express();
let io: Server;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(
  compression({ filter: (req, res) => !req.headers["x-no-compression"] })
);

const server = createServer(app);

export const serverListen = (port: number) => {
  server.listen(port, () => {
    io = new Server(server, {
      cors: corsOptions,
    });

    io.on("connection", (socket: ClientSocket) => {});

    logger.info(`Server listening on port ${port}`);
  });
};
