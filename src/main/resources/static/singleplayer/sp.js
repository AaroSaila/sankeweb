import BoardDrawer from "./BoardDrawer.js";


const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const canvas = document.getElementById("board");
const scoreSpan = document.getElementById("score");
const speedSpan = document.getElementById("speed");
const INPUT_KEYS = ['w', 'a', 's', 'd', 'e'];

let game = {};
const keyQueue = [];
let ws = null;
const boardDrawer = new BoardDrawer(
  canvas.getContext("2d"),
  canvas.width,
  canvas.height,
  20
);

startButton.addEventListener("click", () => {
  ws = new WebSocket("ws://localhost:8080/sp");
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
    "SP_KEY_CHANGE": msg => {
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

const emptyKeyQueue = () => {
  while (keyQueue.length > 0) {
    ws.send(JSON.stringify({
      type: "SP_KEY_CHANGE",
      text: keyQueue.shift()
    }))
  }
};

stopButton.addEventListener("click", () => {
  keyQueue.push('e');
  emptyKeyQueue()
});

// Add button press to event queue
window.addEventListener("keydown", event => {
  if (INPUT_KEYS.includes(event.key)) {
    keyQueue.push(event.key);
  }
  emptyKeyQueue()
})