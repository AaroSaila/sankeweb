import Game from "./Game";

export default class Food {
    x: number;
    y: number;
    game: Game;

    constructor(game: Game) {
        this.x = 10;
        this.y = 10;
        this.game = game;
    }
}
