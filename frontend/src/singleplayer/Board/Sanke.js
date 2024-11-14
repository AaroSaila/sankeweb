"use strict";

import SankePart from "./SankePart.js";
import { MOVE_AMOUNT } from "../spGlobals.js";


export default class Sanke {
  constructor(board, x, y, color) {
    this.board = board;
    this.color = color;

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
    const width = this.board.element.width;
    const height = this.board.element.height;
    const size = this.board.entitySize;

    switch (part.dir) {
      case "u":
        part.y -= MOVE_AMOUNT;
        part.y = part.y === -size ? height - size : part.y;
        break;
      case "r":
        part.x += MOVE_AMOUNT;
        part.x = part.x === width ? 0 : part.x;
        break;
      case "d":
        part.y += MOVE_AMOUNT;
        part.y = part.y === height ? 0 : part.y;
        break;
      case "l":
        part.x -= MOVE_AMOUNT;
        part.x = part.x === -size ? width - size : part.x;
        break;
      default: console.error("ERROR in Sanke.movePartOrHead(), invalid direction"); debugger;
    }
  }

  changeDirection(newDir) {
    this.head.dir = newDir;
    
    for (let i = 0; i < this.parts.length; i++) {
      this.parts[i].newOrder(newDir, i + 1 * this.board.entitySize);
    }
  }

  newPart() {
    const size = this.board.entitySize;

    if (this.parts.length === 0) {
      this.parts.push(
        new SankePart(this.head, size)
      );
    } else {
      const lastPart = this.parts[this.parts.length - 1];
      // console.log(lastPart);
      this.parts.push(
        new SankePart(lastPart, size)
      );
    }
  }

  draw(ctx) {
    // const size = this.board.entitySize;
    // const boardWidth = this.board.element.width;
    // const boardHeight = this.board.element.height;

    ctx.fillStyle = this.color;
    this.drawPartOrHead(this.head, ctx);

    this.parts.forEach(part => this.drawPartOrHead(part, ctx));
  }

  drawPartOrHead(part, ctx) {
    const size = this.board.entitySize;
    const boardWidth = this.board.element.width;
    const boardHeight = this.board.element.height;

    if (this.partWithingBoard(part)) {
      ctx.fillRect(part.x, part.y, size, size);
      return;
    }

    // console.log("not withing board", part.x, part.y);

    if (this.partPhasingUp(part)) {
      // console.log("phasing up");
      const normalHeight = size + part.y;
      const phasingHeight = part.y;

      ctx.fillRect(
        part.x,
        0,
        size,
        normalHeight
      );

      ctx.fillRect(
        part.x,
        boardHeight,
        size,
        phasingHeight
      );
    } else if (this.partPhasingRight(part)) {
      // console.log("phasing right");
      const normalWidth = boardWidth - part.x;
      const phasingWidth = part.x + size - boardWidth;

      ctx.fillRect(
        part.x,
        part.y,
        normalWidth,
        size
      );

      ctx.fillRect(
        0,
        part.y,
        phasingWidth,
        size
      );
    } else if (this.partPhasingDown(part)) {
      // console.log("phasing down");
      const normalHeight = boardHeight - part.y;
      const phasingHeight = part.y + size - boardHeight;

      ctx.fillRect(
        part.x,
        part.y,
        size,
        normalHeight
      );

      ctx.fillRect(
        part.x,
        0,
        size,
        phasingHeight
      );
    } else if (this.partPhasingLeft(part)) {
      // console.log("phasing left");
      const normalWidth = size + part.x;
      const phasingWidth = part.x;

      ctx.fillRect(
        0,
        part.y,
        normalWidth,
        size
      );

      ctx.fillRect(
        boardWidth,
        part.y,
        phasingWidth,
        size
      );
    }
  }

  partWithingBoard(part) {
    const width = this.board.element.width;
    const height = this.board.element.height;
    const size = this.board.entitySize;

    if (
      (part.x >= 0 && part.x <= width - size)
      && (part.y >= 0 && part.y <= height - size)
    ) {
      return true;
    } else {
      return false;
    }
  }

  partPhasingRight(part) {
    const width = this.board.element.width;
    const size = this.board.entitySize;

    if (part.x + size > width && part.x + size < width + size) {
      return true;
    } else {
      return false;
    }
  }

  partPhasingLeft(part) {
    const size = this.board.entitySize;

    if (part.x < 0 && part.x > -size) {
      return true;
    } else {
      return false;
    }
  }

  partPhasingUp(part) {
    const size = this.board.entitySize;

    if (part.y < 0 && part.y > -size) {
      return true;
    } else {
      return false;
    }
  }

  partPhasingDown(part) {
    const height = this.board.element.height;
    const size = this.board.entitySize;

    if (part.y + size > height && part.y + size < height + size) {
      return true;
    } else {
      return false;
    }
  }

}
