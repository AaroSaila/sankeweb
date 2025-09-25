export default class Food {
    constructor(game, x, y) {
        this.x = x;
        this.y = y;
        this.game = game;
    }
    newLocation() {
        console.log("Calculating new food position");
        let multiplier = Math.floor((Math.random() * 100 % (Math.floor(this.game.bounds.right / this.game.entitySize))));
        this.x = this.game.entitySize * multiplier;
        multiplier = Math.floor((Math.random() * 100 % (Math.floor(this.game.bounds.down / this.game.entitySize))));
        this.y = this.game.entitySize * multiplier;
        if (this.game.snake.checkFoodCollision()) {
            this.newLocation();
        }
    }
}
