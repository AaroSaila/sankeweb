"use strict";

import BoardController from "./controller/BoardController.js";
import { TICK_MS } from "./spGlobals.js";


const gameLoop = (board, keyQueue) => {
  // const tickStart = performance.now();

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
  }

  board.tick();

  const score = board.getScore();
  if (score > scoreSpan.textContent) {
    scoreSpan.textContent = score;
  }

  // const tickEnd = performance.now();
  // console.log("tick time:", tickEnd - tickStart);
};


const scoreSpan = document.getElementById("score");

const board = new BoardController(
  document.getElementById("board"),
  "#3d3d3d",
  20
);

let intervalId = null;

const keyQueue = [];

const startButton = document.getElementById("start");

startButton.addEventListener("click", () => {
  startButton.classList.add("disabled");

  intervalId = setInterval(() => gameLoop(board, keyQueue), TICK_MS);

  scoreSpan.textContent = "0";

  document.addEventListener("keypress", (e) => {
    keyQueue.push(e.key);
  })
});

document.getElementById("stop").addEventListener("click", () => clearInterval(intervalId));
