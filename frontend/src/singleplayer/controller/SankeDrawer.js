"use strict";


export default class SankeDrawer {
  constructor(sanke, ctx, color, boardWidth, boardHeight, entitySize) {
    this.sanke = sanke;
    this.ctx = ctx;
    this.color = color;
    this.boardW = boardWidth;
    this.boardH = boardHeight;
    this.size = entitySize;
  }

  draw() {
    // const size = this.board.entitySize;
    // const boardWidth = this.board.element.width;
    // const boardHeight = this.board.element.height;

    this.ctx.fillStyle = this.color;
    console.log(this.sanke.head);
    this.drawPartOrHead(this.sanke.head);
    this.sanke.parts.forEach(part => this.drawPartOrHead(part));
  }

  drawPartOrHead(part) {
    if (this.partWithingBoard(part)) {
      this.ctx.fillRect(part.x, part.y, this.size, this.size);
      return;
    }

    // console.log("not withing board", part.x, part.y);

    if (this.partPhasingUp(part)) {
      // console.log("phasing up");
      const normalHeight = this.size + part.y;
      const phasingHeight = part.y;

      this.ctx.fillRect(
        part.x,
        0,
        this.size,
        normalHeight
      );

      this.ctx.fillRect(
        part.x,
        this.boardH,
        this.size,
        phasingHeight
      );
    } else if (this.partPhasingRight(part)) {
      // console.log("phasing right");
      const normalWidth = this.boardW - part.x;
      const phasingWidth = part.x + this.size - this.boardW;

      this.ctx.fillRect(
        part.x,
        part.y,
        normalWidth,
        this.size
      );

      this.ctx.fillRect(
        0,
        part.y,
        phasingWidth,
        this.size
      );
    } else if (this.partPhasingDown(part)) {
      // console.log("phasing down");
      const normalHeight = this.boardH - part.y;
      const phasingHeight = part.y + this.size - this.boardH;

      this.ctx.fillRect(
        part.x,
        part.y,
        this.size,
        normalHeight
      );

      this.ctx.fillRect(
        part.x,
        0,
        this.size,
        phasingHeight
      );
    } else if (this.partPhasingLeft(part)) {
      // console.log("phasing left");
      const normalWidth = this.size + part.x;
      const phasingWidth = part.x;

      this.ctx.fillRect(
        0,
        part.y,
        normalWidth,
        this.size
      );

      this.ctx.fillRect(
        this.boardW,
        part.y,
        phasingWidth,
        this.size
      );
    }
  }

  partWithingBoard(part) {
    if (
      (part.x >= 0 && part.x <= this.boardW - this.size)
      && (part.y >= 0 && part.y <= this.boardH - this.size)
    ) {
      return true;
    } else {
      return false;
    }
  }

  partPhasingRight(part) {
    if (part.x + this.size > this.boardW && part.x + this.size < this.boardW + this.size) {
      return true;
    } else {
      return false;
    }
  }

  partPhasingLeft(part) {
    if (part.x < 0 && part.x > -this.size) {
      return true;
    } else {
      return false;
    }
  }

  partPhasingUp(part) {
    if (part.y < 0 && part.y > -this.size) {
      return true;
    } else {
      return false;
    }
  }

  partPhasingDown(part) {
    if (part.y + this.size > this.boardH && part.y + this.size < this.boardH + this.size) {
      return true;
    } else {
      return false;
    }
  }
}
