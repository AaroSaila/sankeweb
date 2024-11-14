"use strict";

import BoardController from "./controller/BoardController.js";


const gameLoop = board => {
  board.tick();

  const score = board.getScore();
  if (score > scoreSpan.textContent) {
    scoreSpan.textContent = score;
  }
};


const scoreSpan = document.getElementById("score");

const board = new BoardController(
  document.getElementById("board"),
  "#3d3d3d",
  20
);

let intervalId = null;

const startButton = document.getElementById("start");

startButton.addEventListener("click", () => {
  startButton.classList.add("disabled");

  intervalId = setInterval(() => gameLoop(board), 5);

  scoreSpan.textContent = "0";

  document.addEventListener("keypress", (e) => {
    switch (e.key) {
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
  })
});

document.getElementById("stop").addEventListener("click", () => clearInterval(intervalId));
