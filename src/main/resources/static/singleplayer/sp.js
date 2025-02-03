import BoardDrawer from "./BoardDrawer.js";


const startButton = document.getElementById("start");
const canvas = document.getElementById("board");
const scoreSpan = document.getElementById("score");
const INPUT_KEYS = ['w', 'a', 's', 'd'];

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
  ws.onmessage = event => {
    const msg = JSON.parse(event.data);
    console.log(msg);
    if (msg.msgType === "gamestate") {
      game = msg.game;
      boardDrawer.draw(game.board);
      scoreSpan.textContent = game.score;
    } else if (msg.msgType === "text") {
      console.log("From ws: " + msg.text);
    }
  };
  startButton.style.display = "none";
});

// Add button press to event queue
window.addEventListener("keydown", event => {
  if (INPUT_KEYS.includes(event.key)) {
    keyQueue.push(event.key);
  }

  while (keyQueue.length > 0) {
    ws.send(JSON.stringify({
      gameId: game.id,
      key: keyQueue.shift()
    }))
  }
})

// Send by button press
// window.addEventListener("keydown", event => {
//   if (INPUT_KEYS.includes(event.key)) {
//     ws.send(JSON.stringify({
//       gameId: game.id,
//       key: event.key
//     }))
//   }
// })