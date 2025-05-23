import Game from "../game/Game.js";
import Directions from "../game/Directions.js";

export default class KeyQueue {
  game: Game;
  ws: WebSocket;
  queue: string[];

  constructor(game: Game, ws: WebSocket) {
    this.game = game;
    this.ws = ws;
    this.queue = [];
  }

  emptyQueue() {
    while (this.queue.length > 0) {
      // this.ws.send(JSON.stringify({
      //   type: "KEY_CHANGE",
      //   text: this.queue.shift()
      // }))

      const key = this.queue.shift();
      switch (key) {
        case "w":
          this.game.snake.direction = Directions.UP;
          break;
        case "a":
          this.game.snake.direction = Directions.LEFT;
          break;
        case "s":
          this.game.snake.direction = Directions.DOWN;
          break;
        case "d":
          this.game.snake.direction = Directions.RIGHT;
          break;
      }
    }
  }

  push(key: string) {
    this.queue.push(key);
    this.emptyQueue();
  }
}