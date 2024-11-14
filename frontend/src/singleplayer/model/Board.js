"use strict";

import Sanke from "./Sanke.js";
import { populateCoords } from "../utils/populateCoords.js";


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
    const foodCoords = populateCoords(this.food, this.entitySize);
    const sankeCoords = populateCoords(this.sanke.head, this.entitySize);
    // console.log(foodCoords, sankeCoords);

    for (let i = 0; i < foodCoords.length; i++) {
      for (let j = 0; j < sankeCoords.length; j++) {
        if (
          foodCoords[i][0] === sankeCoords[j][0]
          && foodCoords[i][1] === sankeCoords[j][1]
        ) {
          return true;
        }
      }
    }

    return false;
  }

  checkFood() {
    if (this.checkFoodCollision()) {
      this.food.x = parseInt(Math.random() * 100 % 600);
      this.food.y = parseInt(Math.random() * 100 % 600);
      
      this.score++;
      this.sanke.newPart();
    }
  }

  changeSankeDirection(newDir) {
    this.sanke.changeDirection(newDir);
  }
}
