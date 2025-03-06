import BoardDrawer from "../utils/BoardDrawer.js";
import KeyQueue from "../utils/KeyQueue.js";
import Env from "../env.js";


const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const canvas = document.getElementById("main-board");
const scoreSpan = document.getElementById("main-score");
const speedSpan = document.getElementById("main-speed");
const INPUT_KEYS = ['w', 'a', 's', 'd', 'e'];

let game = {};
let ws = null;
let keyQueue = null;
const boardDrawer = new BoardDrawer(
  canvas.getContext("2d"),
  canvas.width,
  canvas.height,
  20
);

startButton.addEventListener("click", () => {
  ws = new WebSocket(Env.wsSp);
  keyQueue = new KeyQueue(ws);
  ws.onopen = () => {
    ws.send(JSON.stringify({
      type: "SP_START",
      text: ""
    }));
  }

  const messageFunctions = {
    "GAMESTATE": msg => {
      game = msg.game;
      boardDrawer.draw(game.board);
      scoreSpan.textContent = game.score;
      speedSpan.textContent = game.tickRate;
    },
    "KEY_CHANGE": msg => {
      console.log(msg.text);
    },
    "GAME_OVER": _ => {
      const gameOverSpan = document.createElement("span");
      gameOverSpan.textContent = "Game Over!";
      gameOverSpan.id = "game-over";
      stopButton.insertAdjacentElement("beforebegin", gameOverSpan);
    }
  };

  ws.onmessage = event => {
    const msg = JSON.parse(event.data);
    messageFunctions[msg.msgType](JSON.parse(event.data));
  };
  startButton.style.display = "none";
});

stopButton.addEventListener("click", () => {
  keyQueue.push('e');
});

// Add button press to event queue
window.addEventListener("keydown", event => {
  if (INPUT_KEYS.includes(event.key)) {
    keyQueue.push(event.key);
  }
})