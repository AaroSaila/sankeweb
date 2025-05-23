import BoardDrawer from "../utils/BoardDrawer.js";
import KeyQueue from "../utils/KeyQueue.js";
import env from "../env.js";
import Game from "../game/Game.js";

function startGameLoop(game: Game, drawer: BoardDrawer): number {
  const gameLoop = () => {
    game.tick();
    drawer.draw();
  }

  return setInterval(gameLoop, 500)
}


const startButton = document.getElementById("start") as HTMLButtonElement;
const stopButton = document.getElementById("stop") as HTMLButtonElement;
const canvas = document.getElementById("main-board") as HTMLCanvasElement;
const scoreSpan = document.getElementById("main-score") as HTMLSpanElement;
const speedSpan = document.getElementById("main-speed") as HTMLSpanElement;
const INPUT_KEYS: Array<string> = ['w', 'a', 's', 'd', 'e'];

let ws: WebSocket | null = null;

startButton.addEventListener("click", () => {
  ws = new WebSocket(env.wsSp);
  // ws.onopen = () => {
  //   ws?.send(JSON.stringify({
  //     type: "SP_START",
  //     text: ""
  //   }));
  // }
  startButton.style.display = "none";

  const ctx = canvas.getContext("2d");
  if (ctx == null) {
    console.error("Cannot get context when starting SP.");
    return;
  }

  const game = new Game(1, 600, 20, 0, 20, 300, 300)
  let keyQueue: KeyQueue = new KeyQueue(game, ws);
  const drawer = new BoardDrawer(ctx, game);
  const gameLoopIntervalId = startGameLoop(game, drawer);

  stopButton.addEventListener("click", () => {
    keyQueue.push('e');
  });

  // Add button press to event queue
  window.addEventListener("keydown", event => {
    if (INPUT_KEYS.includes(event.key)) {
      keyQueue.push(event.key);
    }
  })
});

