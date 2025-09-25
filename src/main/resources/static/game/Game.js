import Snake from "./Snake.js";
import Food from "./Food.js";
import TickEvent from "../TickEvent.js";
export default class Game {
    constructor(playerId, boardSize, entitySize, snakeX, snakeY, foodX, foodY) {
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
        let returnVal = TickEvent.NONE;
        this.snake.move();
        if (this.snake.checkFoodCollision()) {
            console.log("Food collision");
            this.score++;
            this.food.newLocation();
            this.snake.addPart();
            returnVal = TickEvent.FOOD;
        }
        return returnVal;
    }
}
