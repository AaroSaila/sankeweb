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
    this.model.moveSanke();
    this.model.checkFood();
    this.draw();
  }

  draw() {
    // Reset board
    this.ctx.clearRect(
      0,
      0,
      this.element.width,
      this.element.height
    );

    this.ctx.fillStyle = this.model.food.color;
    this.ctx.fillRect(
      this.model.food.x,
      this.model.food.y,
      this.entitySize,
      this.entitySize
    );

    this.sankeDrawer.draw();
  }

  changeSankeDirection(newDir) {
    const oldDir = this.model.getSankeDirection();

    if (oldDir === newDir) {
      return;
    }

    // Check if directions are opposites
    const dirs = [oldDir, newDir];

    if (
      dirs.includes("u") && dirs.includes("d")
      || dirs.includes("l") && dirs.includes("r")
    ) {
      return;
    }

    this.model.changeSankeDirection(newDir);
  }

  getScore() {
    return this.model.score;
  }
}
