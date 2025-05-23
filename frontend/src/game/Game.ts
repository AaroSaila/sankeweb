import Snake from "./Snake";
import Food from "./Food";

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

    constructor(playerId: number) {
        this.playerId = playerId;
        this.score = 0;
        this.boardSize = 100;
        this.entitySize = 10;
        this.bounds = {
            up: 0,
            down: this.boardSize - this.entitySize,
            left: 0,
            right: this.boardSize - this.entitySize
        };
        this.snake = new Snake(this);
        this.food = new Food(this);
    }
}
