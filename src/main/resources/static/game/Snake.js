import Directions from "./Directions.js";
import SnakePart from "./SnakePart.js";
import directions from "./Directions.js";
export default class Snake {
    constructor(game, x, y) {
        this.x = x;
        this.y = y;
        this.direction = Directions.RIGHT;
        this.game = game;
        this.parts = new Array();
    }
    checkBounds(part) {
        if (part.x > this.game.bounds.right) {
            part.x = this.game.bounds.left;
        }
        else if (part.x < this.game.bounds.left) {
            part.x = this.game.bounds.right;
        }
        else if (part.y > this.game.bounds.down) {
            part.y = this.game.bounds.up;
        }
        else if (part.y < this.game.bounds.up) {
            part.y = this.game.bounds.down;
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
        this.checkBounds(this);
    }
    checkFoodCollision() {
        const snakeX = this.x;
        const snakeY = this.y;
        const foodX = this.game.food.x;
        const foodY = this.game.food.y;
        const entitySize = this.game.entitySize;
        return (snakeX >= foodX && snakeX < foodX + entitySize)
            && (snakeY >= foodY && snakeY < foodY + entitySize);
    }
    addPart() {
        let newX;
        let newY;
        let lastPart;
        let secondLastPart;
        let lastDir;
        const getPreviousPartDirection = (lastPart, secondLastPart) => {
            if (secondLastPart.x < lastPart.x) {
                return directions.LEFT;
            }
            else if (secondLastPart.x > lastPart.x) {
                return directions.RIGHT;
            }
            else if (secondLastPart.y < lastPart.y) {
                return directions.UP;
            }
            else if (secondLastPart.y > lastPart.y) {
                return directions.DOWN;
            }
            else {
                console.error("Invalid direction in Snake::addPart::getPreviousPartDirection");
                return null;
            }
        };
        switch (this.parts.length) {
            case 0:
                lastPart = this;
                lastDir = this.direction;
                break;
            case 1:
                lastPart = this.parts[this.parts.length - 1];
                secondLastPart = this;
                lastDir = getPreviousPartDirection(lastPart, secondLastPart);
                break;
            default:
                lastPart = this.parts[this.parts.length - 1];
                secondLastPart = this.parts[this.parts.length - 2];
                lastDir = getPreviousPartDirection(lastPart, secondLastPart);
        }
        switch (lastDir) {
            case Directions.UP:
                newX = lastPart.x;
                newY = lastPart.y + this.game.entitySize;
                break;
            case Directions.DOWN:
                newX = lastPart.x;
                newY = lastPart.y - this.game.entitySize;
                break;
            case Directions.RIGHT:
                newX = lastPart.x + this.game.entitySize;
                newY = lastPart.y;
                break;
            case Directions.LEFT:
                newX = lastPart.x - this.game.entitySize;
                newY = lastPart.y;
                break;
        }
        const newPart = new SnakePart(newX, newY);
        this.checkBounds(newPart);
        this.parts.push(newPart);
    }
}
