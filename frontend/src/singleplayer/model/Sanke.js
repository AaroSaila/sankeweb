"use strict";

import SankePart from "./SankePart.js";
import { MOVE_AMOUNT } from "../spGlobals.js";


export default class Sanke {
  constructor(board, x, y, color, boardWidth, boardHeight, entitySize) {
    this.board = board;
    this.color = color;
    this.boardW = boardWidth;
    this.boardH = boardHeight;
    this.size = entitySize;

    this.head = {
      x: x,
      y: y,
      dir: "l"
    };

    this.parts = [];
  }

  move() {
    this.movePartOrHead(this.head);
    this.parts.forEach(part => {
      // console.log("about to move part:");
      // console.log(part);
      this.movePartOrHead(part);
      part.processOrders();
    });
  }

  movePartOrHead(part) {
    switch (part.dir) {
      case "u":
        part.y -= MOVE_AMOUNT;
        part.y = part.y === -this.size ? this.boardH - this.size : part.y;
        break;
      case "r":
        part.x += MOVE_AMOUNT;
        part.x = part.x === this.boardW ? 0 : part.x;
        break;
      case "d":
        part.y += MOVE_AMOUNT;
        part.y = part.y === this.boardH ? 0 : part.y;
        break;
      case "l":
        part.x -= MOVE_AMOUNT;
        part.x = part.x === -this.size ? this.boardW - this.size : part.x;
        break;
      default: console.error("ERROR in Sanke.movePartOrHead(), invalid direction"); debugger;
    }
  }

  changeDirection(newDir) {
    this.head.dir = newDir;
    
    for (let i = 0; i < this.parts.length; i++) {
      this.parts[i].newOrder(newDir, i + 1 * this.size);
    }
  }

  newPart() {
    if (this.parts.length === 0) {
      this.parts.push(
        new SankePart(this.head, this.size)
      );
    } else {
      const lastPart = this.parts[this.parts.length - 1];
      // console.log(lastPart);
      this.parts.push(
        new SankePart(lastPart, this.size)
      );
    }
  }
}
