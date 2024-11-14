"use strict";

import Sanke from "./Sanke.js";


export default class Board {
  constructor(entitySize, boardWidth, boardHeight) {
    this.entitySize = entitySize;

    this.sanke = new Sanke(
      this,
      300,
      300,
      "green",
      boardWidth,
      boardHeight,
      entitySize
    );

    this.food = {
      x: 400,
      y: 400,
      color: "red"
    };

    this.score = 0;
  }

  moveSanke() {
    this.sanke.move();
  }

  checkFoodCollision() {
    if (
      this.sanke.head.x === this.food.x
      && this.sanke.head.y === this.food.y
    ) {
      return true;
    } else {
      return false
    }
  }

  checkFood() {
    if (this.checkFoodCollision()) {
      this.sanke.newPart();

      let newX = 1;
      let newY = 1;

      while (
        newX % this.entitySize !== 0
        && newX !== this.sanke.head.x
      ) {
        // console.log("generating number")
        newX = parseInt(Math.random() * 1000 % 600);
      }

      while (
        newY % this.entitySize !== 0
        && newY !== this.sanke.head.y
      ) {
        // console.log("generating number")
        newY = parseInt(Math.random() * 1000 % 600);
      }

      if (this.sanke.checkTailCollision(newX, newY)) {
        while (
          newY % this.entitySize !== 0
          && newY !== this.sanke.head.y
        ) {
          // console.log("generating number")
          newY = parseInt(Math.random() * 1000 % 600);
        }
      }

      this.food.x = newX;
      this.food.y = newY;

      this.score++;
    }
  }

  getSankeDirection() {
    return this.sanke.head.dir;
  }

  changeSankeDirection(newDir) {
    this.sanke.changeDirection(newDir);
  }
}
