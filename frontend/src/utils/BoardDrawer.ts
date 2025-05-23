import Game from "../game/Game";

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
  boardSize: number;
  drawInfo: DrawInfo | null;

  constructor(ctx: CanvasRenderingContext2D, game: Game, targetBoardSize: number) {
    this.ctx = ctx;
    this.game = game;
    this.snakeColor = "green";
    this.foodColor = "red";
    this.boardSize = targetBoardSize;
    this.drawInfo = null;
  }

  getDrawInfo() {
    const drawInfo: DrawInfo = emptyDrawInfo();
    drawInfo.snakeX = this.game.snake.x;
    drawInfo.snakeY = this.game.snake.y;
    drawInfo.foodX = this.game.food.x;
    drawInfo.foodY = this.game.food.y;
    drawInfo.entitySize = this.game.entitySize;

    const scaleFactor = this.boardSize / this.game.boardSize;

    for (let key in drawInfo) {
      drawInfo[key] *= scaleFactor;
    }

    return drawInfo;
  }
}