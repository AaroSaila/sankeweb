"use strict";

import Board from "./Board/Board.js";

const gameLoop = board => {
  board.draw();

  board.moveSanke();
};


const board = new Board(600, 600, "#3d3d3d", 20);

const gameDiv = document.getElementById("game");

gameDiv.appendChild(board.element);

const startButton = document.createElement("button");
startButton.textContent = "Start";
gameDiv.appendChild(startButton);

startButton.addEventListener("click", () => {
  // Game loop

  setInterval(() => gameLoop(board), 100);

});
