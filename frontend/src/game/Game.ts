import Snake from "./Snake.js";
import Food from "./Food.js";

interface Bounds {
    up: number,
    down: number,
    left: number,
    right: number
}

export default class Game {
    score: number;
    playerId: number;
    snake: Snake;
    food: Food;
    boardSize: number;
    entitySize: number;
    bounds: Bounds;

    constructor(
        playerId: number,
        boardSize: number,
        entitySize: number,
        snakeX: number,
        snakeY: number,
        foodX: number,
        foodY: number
    )
    {
        this.playerId = playerId;
        this.score = 0;
        this.boardSize = boardSize;
        this.entitySize = entitySize;
        this.bounds = {
            up: 0,
            down: this.boardSize - this.entitySize,
            left: 0,
            right: this.boardSize - this.entitySize
        };
        this.snake = new Snake(this, snakeX, snakeY);
        this.food = new Food(this, foodX, foodY);
    }

    tick() {
        this.snake.move();
    }
}
