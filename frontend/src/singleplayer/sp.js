"use strict";

import Board from "./Board/Board.js";

const gameLoop = board => {
  board.draw();
  board.moveSanke();
  board.checkFood();
  
  if (board.score > scoreSpan.textContent) {
    scoreSpan.textContent = board.score;
  }
};


const scoreSpan = document.getElementById("score");

const board = new Board(
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
        board.sanke.changeDirection("u");
        break;
      case "d":
        board.sanke.changeDirection("r");
        break;
      case "s":
        board.sanke.changeDirection("d");
        break;
      case "a":
        board.sanke.changeDirection("l");
        break;
    }
  })
});

document.getElementById("stop").addEventListener("click", () => clearInterval(intervalId));
