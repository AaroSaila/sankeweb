"use strict";

const MOVE_AMOUNT = 1;


export default class Sanke {
  constructor(board, x, y, color) {
    this.board = board;
    this.color = color;

    this.parts = [
      {
        x: x,
        y: y,
        dir: "u"
      }
    ];
  }

  draw(ctx) {
    const size = this.board.entitySize;
    ctx.fillStyle = this.color;
    this.parts.forEach(part => {
      if (this.partWithingBoard(part)) {
        ctx.fillRect(part.x, part.y, size, size);
        return;
      }

      console.log("not withing board")

      if (this.partPhasingUp(part)) {
        console.log("phasing up");
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
          this.board.element.height,
          size,
          phasingHeight
        );
      }
    });
  }

  move() {
    const width = this.board.element.width;
    const height = this.board.element.height;
    const size = this.board.entitySize;

    this.parts.forEach(part => {
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
        default: console.error("ERROR in Sanke.move(), invalid direction");
      }
    })
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
