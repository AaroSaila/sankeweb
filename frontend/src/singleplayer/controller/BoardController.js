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
      "darkgreen",
      element.width,
      element.height,
      entitySize
    );
  }

  tick() {
    if (this.model.moveSanke() === "tail hit") {
      return "game end";
    } 

    if (this.model.checkFood() === "food hit") {
      return "speed up";
    } 

    this.draw();

    return null;
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

  log() {
    // Head
    console.log("Head:")
    console.log(this.model.sanke.head.x, this.model.sanke.head.y);

    // Parts
    console.log("Parts: ");
    for (let i = 0; i < this.model.sanke.parts.length - 1; i++) {
      console.log(i, this.model.sanke.parts[i].x, this.model.sanke.parts[i].y);
    }
  }
}
