import { gameLoop } from "./core/gameLoop";
import { serverListen } from "./network/webSocketServer";

const main = () => {
  const port = Number(process.env.SERVER_PORT);

  serverListen(port, gameLoop);
};

main();
