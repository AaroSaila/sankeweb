import Directions from "./Directions.js";
import Game from "./Game.js";

export default class Snake {
  x: number;
  y: number;
  direction: Directions;
  game: Game;

  constructor(game: Game, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.direction = Directions.RIGHT;
    this.game = game;
  }

  checkBounds() {
    if (this.x > this.game.bounds.right) {
      this.x = this.game.bounds.left;
    } else if (this.x < this.game.bounds.left) {
      this.x = this.game.bounds.right;
    } else if (this.y > this.game.bounds.down) {
      this.y = this.game.bounds.up;
    } else if (this.y < this.game.bounds.up) {
      this.y = this.game.bounds.down;
    }
  }

  move() {
    switch (this.direction) {
      case Directions.UP:
        this.y -= this.game.entitySize;
        break;
      case Directions.DOWN:
        this.y += this.game.entitySize;
        break;
      case Directions.LEFT:
        this.x -= this.game.entitySize;
        break;
      case Directions.RIGHT:
        this.x += this.game.entitySize;
        break;
      default:
        console.error(`ERROR: Invalid direction '${this.direction}' in Snake::move.`);
        return;
    }
    this.checkBounds();
  }
}
