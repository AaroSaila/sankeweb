import Game from "../game/Game.js";

interface DrawInfo {
  [index: string]: number,
  snakeX: number;
  snakeY: number;
  foodX: number;
  foodY: number;
  entitySize: number;
}

function emptyDrawInfo(): DrawInfo {
  return {
    snakeX: -1,
    snakeY: -1,
    foodX: -1,
    foodY: -1,
    entitySize: -1
  }
}

export default class BoardDrawer {
  ctx: CanvasRenderingContext2D;
  game: Game;
  snakeColor: string;
  foodColor: string;

  constructor(ctx: CanvasRenderingContext2D, game: Game) {
    this.ctx = ctx;
    this.game = game;
    this.snakeColor = "green";
    this.foodColor = "red";
  }

  drawFood() {
    this.ctx.fillStyle = this.foodColor;
    this.ctx.fillRect(this.game.food.x, this.game.food.y, this.game.entitySize, this.game.entitySize);
  }

  drawSnakePart(x: number, y: number) {
    this.ctx.fillStyle = this.snakeColor;
    this.ctx.fillRect(x, y, this.game.entitySize, this.game.entitySize)
  }

  draw() {
    this.ctx.clearRect(0, 0, this.game.boardSize, this.game.boardSize);
    this.drawSnakePart(this.game.snake.x, this.game.snake.y);
    this.drawFood();
  }
}