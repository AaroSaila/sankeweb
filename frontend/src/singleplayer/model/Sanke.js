"use strict";


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
    this.parts.forEach(part => {
      // console.log("about to move part:");
      // console.log(part);
      this.movePartOrHead(part);
      this.processOrders(part);
    });
    this.movePartOrHead(this.head);
  }

  movePartOrHead(part) {
    switch (part.dir) {
      case "u":
        part.y -= this.size
        part.y = part.y === -this.size ? this.boardH - this.size : part.y;
        break;
      case "r":
        part.x += this.size;
        part.x = part.x === this.boardW ? 0 : part.x;
        break;
      case "d":
        part.y += this.size;
        part.y = part.y === this.boardH ? 0 : part.y;
        break;
      case "l":
        part.x -= this.size;
        part.x = part.x === -this.size ? this.boardW - this.size : part.x;
        break;
      default: console.error("ERROR in Sanke.movePartOrHead(), invalid direction"); debugger;
    }
  }

  changeDirection(newDir) {
    this.head.dir = newDir;

    for (let i = 0; i < this.parts.length; i++) {
      this.newOrder(this.parts[i], newDir, i + 1);
    }
  }

  newOrder(part, dir, delay) {
    part.orders.push({
      dir: dir,
      delay: delay
    });
    // console.log("added order", dir, delay)
  }

  processOrders(part) {
    // console.log("processing orders for part:")
    // console.log(this);
    if (part.orders.length === 0) {
      return;
    }

    // console.log("orders processing")
    part.orders.forEach(order => {
      order.delay = order.delay <= 0 ? 0 : order.delay - 1;
      // console.log(order);
    });

    if (part.orders[0].delay <= 0) {
      const order = part.orders.shift();
      part.dir = order.dir;
    }
  }

  newPart() {
    let lastPart = this.parts[this.parts.length - 1];
    let lastPartIsHead = false;
    if (lastPart === undefined) {
      lastPartIsHead = true;
      lastPart = this.head;
    }

    let x;
    let y;

    switch (lastPart.dir) {
      case "u":
        x = lastPart.x;
        y = lastPart.y + this.size;
        break;
      case "r":
        x = lastPart.x - this.size;
        y = lastPart.y;
        break;
      case "d":
        x = lastPart.x;
        y = lastPart.y - this.size;
        break;
      case "l":
        x = lastPart.x + this.size;
        y = lastPart.y;
        break;
      default:
        console.error("ERROR: wrong direction in Sanke.newPart()");
    }

    const orders = lastPartIsHead
      ? []
      : JSON.parse(JSON.stringify(lastPart.orders));

    if (orders.length !== 0) {
      orders.forEach(order => order.delay++);
    }

    const newPart = {
      x: x,
      y: y,
      dir: lastPart.dir,
      orders: orders
    };

    this.parts.push(newPart);
  }

  checkTailCollision(x, y) {
    for (let i = 0; i < this.parts.length - 1; i++) {
      if (this.parts[0].x === x && this.parts[0].y === y) {
        return true;
      }
    }

    return false;
  }
}
