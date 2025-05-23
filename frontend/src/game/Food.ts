import Game from "./Game.js";

export default class Food {
    x: number;
    y: number;
    game: Game;

    constructor(game: Game, x: number, y: number) {
        this.x = x;
        this.y = y;
        this.game = game;
    }
}
