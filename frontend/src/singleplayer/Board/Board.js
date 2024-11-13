"use strict";

import Sanke from "./Sanke.js";


export default class Board {
  constructor(width, height, color, entitySize) {
    this.element = document.createElement("canvas");
    this.element.width = width;
    this.element.height = height;

    this.color = color;
    this.entitySize = entitySize;

    this.ctx = this.element.getContext("2d");
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      0,
      0,
      this.element.width,
      this.element.height
    );

    this.sanke = new Sanke(this, 100, 10, "green");

    this.food = {
      x: 400,
      y: 400,
      size: entitySize,
      color: "red"
    };
  }

  draw() {
    // Reset board
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
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
      this.food.size,
      this.food.size
    );
  }

  moveSanke() {
    this.sanke.move();
  }
}
