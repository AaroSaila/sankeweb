"use strict";

import Board from "../model/Board.js";
import SankeDrawer from "./SankeDrawer.js";


export default class BoardController {
  constructor(element, color, entitySize) {
    this.element = element;
    this.color = color;
    this.entitySize = entitySize;

    this.ctx = element.getContext("2d");
    this.model = new Board(20, element.width, element.height);
    this.sankeDrawer = new SankeDrawer(
      this.model.sanke,
      this.ctx,
      "green",
      element.width,
      element.height,
      entitySize
    );
  }

  tick() {
    this.draw();
    this.model.moveSanke();
    this.model.checkFood();
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

    this.sankeDrawer.draw();

    this.ctx.fillStyle = this.model.food.color;
    this.ctx.fillRect(
      this.model.food.x,
      this.model.food.y,
      this.entitySize,
      this.entitySize
    );
  }

  changeSankeDirection(newDir) {
    this.model.changeSankeDirection(newDir);
  }

  getScore() {
    return this.model.score;
  }
}
