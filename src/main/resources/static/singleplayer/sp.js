"use strict";

import BoardController from "./controller/BoardController.js";


const gameLoop = (board, keyQueue, tickMs) => {
  console.log("game speed", tickMs);
  let gameEnds = false;
  // console.log(keyQueue)

  switch (keyQueue.shift()) {
    case "w":
      board.changeSankeDirection("u");
      break;
    case "d":
      board.changeSankeDirection("r");
      break;
    case "s":
      board.changeSankeDirection("d");
      break;
    case "a":
      board.changeSankeDirection("l");
      break;
    case "end":
      gameEnds = true;
      break;
  }

  const gameEvent = board.tick();

  switch (gameEvent) {
    case "game end":
      gameEnds = true;
      break;
    case "speed up":
      tickMs = Math.ceil(tickMs * 0.95);
      break;
  }

  const score = board.getScore();
  if (score > scoreSpan.textContent) {
    scoreSpan.textContent = score;
  }

  if (gameEnds) {
    return;
  }

  return setTimeout(() => gameLoop(board, keyQueue, tickMs), tickMs);
}


const scoreSpan = document.getElementById("score");

const board = new BoardController(
  document.getElementById("board"),
  "#3d3d3d",
  20
);

const keyQueue = [];

const startButton = document.getElementById("start");

startButton.addEventListener("click", () => {
  startButton.classList.add("disabled");

  gameLoop(board, keyQueue, 100);

  scoreSpan.textContent = "0";

  document.addEventListener("keypress", (e) => {
    keyQueue.push(e.key);
  })

  document.getElementById("stop").addEventListener("click", () => keyQueue.push("end"));
});


// document.addEventListener("keypress", e => {
//   if (e.key === " ") {
//     board.log();
//   }
//   if (e.key === "Enter") {
//     gameLoop(board, keyQueue, null);
//   }
//   switch (e.key) {
//     case "w":
//       board.changeSankeDirection("u");
//       break;
//     case "d":
//       board.changeSankeDirection("r");
//       break;
//     case "s":
//       board.changeSankeDirection("d");
//       break;
//     case "a":
//       board.changeSankeDirection("l");
//       break;
//   }
// });
