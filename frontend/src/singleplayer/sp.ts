import BoardDrawer from "../utils/BoardDrawer.js";
import KeyQueue from "../utils/KeyQueue.js";
import Game from "../game/Game.js";
import TickEvent from "../TickEvent.js";

const startButton = document.getElementById("start") as HTMLButtonElement;
const stopButton = document.getElementById("stop") as HTMLButtonElement;
const canvas = document.getElementById("main-board") as HTMLCanvasElement;
const scoreSpan = document.getElementById("main-score") as HTMLSpanElement;
const speedSpan = document.getElementById("main-speed") as HTMLSpanElement;
const INPUT_KEYS: Array<string> = ['w', 'a', 's', 'd', 'e'];

let ws: WebSocket | null = null;

function startGameLoop(game: Game, drawer: BoardDrawer): number {
  const gameLoop = () => {
    const tickEvent = game.tick();
    switch (tickEvent) {
      case TickEvent.NONE:
        break;
      case TickEvent.FOOD:
        scoreSpan.textContent = game.score.toString();
        break;
      default:
        console.error("Invalid TickEvent in sp::startGameLoop");
    }
    drawer.draw();
  }

  return setInterval(gameLoop, 250)
}

startButton.addEventListener("click", () => {
  ws = new WebSocket("/ws/sp");
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

  const game = new Game(1, 600, 20, 0, 20, 100, 100)
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

