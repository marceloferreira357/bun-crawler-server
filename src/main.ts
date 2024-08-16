import { serverListen } from "./network/server";

const port = Number(process.env.SERVER_PORT);
serverListen(port);
