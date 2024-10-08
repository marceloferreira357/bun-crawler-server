# Bun Crawler Server

The **Bun Crawler Server** is the backend server for the [Bun Crawler Client](https://github.com/marceloferreira357/bun-crawler-client). This project handles all the game logic, including player movements, scene updates, and client connections. The server is responsible for managing real-time communication with the clients and keeping the game state consistent across all connected players.

## Getting Started

### Requirements

- [Bun](https://bun.sh/) (Ensure Bun is installed on your machine)

### Setup

1. Install dependencies:

   ```bash
   bun install
   ```

2. Create a `.env` file based on the provided `.env.example`:

   ```bash
   cp .env.example .env
   ```

   You will need to configure the following environment variables:

   ```env
   SERVER_PORT=4000    # The port the server will run on
   MAX_CLIENTS=2       # Maximum number of clients that can connect to the server
   ```

3. Start the development server:

   ```bash
   bun run dev
   ```

## Server Events

The server communicates with the client by emitting various events. Below is a list of events used for communication:

```typescript
export enum Events {
  DISCONNECT = "disconnect",
  PING = "ping",
  PLAYER_MOVEMENT = "player_movement",
  SERVER_FULL = "server_full",
  PONG = "pong",
  UPDATE_SCENE = "update_scene",
  PLAYER_CONNECTED = "player_connected",
  PLAYER_DISCONNECTED = "player_disconnected",
  PLAYER_MESSAGE = "player_message_send",
  PLAYER_MESSAGE_SCENE = "player_message_scene",
}
```

### Event Descriptions

- **DISCONNECT**: Sent when a client disconnects from the server.
- **PING/PONG**: The server periodically sends a `PING` event to ensure the connection is active, and the client should respond with a `PONG`.
- **PLAYER_MOVEMENT**: The server broadcasts player movement updates to all clients.
- **SERVER_FULL**: If the server has reached the maximum number of clients (`MAX_CLIENTS`), new connection attempts will receive this event.
- **UPDATE_SCENE**: Sends the current state of the game (scene) to all clients.
- **PLAYER_CONNECTED**: Emitted when a new player successfully connects to the server.
- **PLAYER_DISCONNECTED**: Emitted when a player leaves the game.
- **PLAYER_MESSAGE**: Received when a player sends a message.
- **PLAYER_MESSAGE_SCENE**: The server broadcasts the player message to all clients

## Contributing

Feel free to open issues or submit pull requests if you'd like to contribute to the project.
