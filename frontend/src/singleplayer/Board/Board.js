"use strict";

import Sanke from "./Sanke.js";
import { populateCoords } from "../utils/populateCoords.js";


export default class Board {
  constructor(element, color, entitySize) {
    this.element = element;
    this.color = color;
    this.entitySize = entitySize;

    this.ctx = this.element.getContext("2d");

    this.sanke = new Sanke(this, 300, 300, "green");

    this.food = {
      x: 400,
      y: 400,
      color: "red"
    };

    this.score = 0;
  }

  draw() {
    // Reset board
    // this.ctx.fillStyle = this.color;
    this.ctx.clearRect(
      0,
      0,
      this.element.width,
      this.element.height
    );

    this.sanke.draw(this.ctx);

    this.ctx.fillStyle = this.food.color;
    this.ctx.fillRect(
      this.food.x,
      this.food.y,
      this.entitySize,
      this.entitySize
    );
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
}
