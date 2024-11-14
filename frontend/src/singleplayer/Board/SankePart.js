"use strict";

import {MOVE_AMOUNT} from "../spGlobals.js";


export default class SankePart {
  constructor(lastPart, size) {
    switch (lastPart.dir) {
      case "u":
        this.x = lastPart.x;
        this.y = lastPart.y + size;
        break;
      case "r":
        this.x = lastPart.x - size;
        this.y = lastPart.y;
        break;
      case "d":
        this.x = lastPart.x;
        this.y = lastPart.y - size;
        break;
      case "l":
        this.x = lastPart.x + size;
        this.y = lastPart.y;
        break;
      default:
        console.error("ERROR: wrong direction in Sanke.newPart()");
    }

    this.dir = lastPart.dir;
    this.size = size;

    // Check if lastPart is head
    if (lastPart.orders !== undefined) {
      this.orders = [...lastPart.orders];
    } else {
      this.orders = [];
    }

    console.log("New sanke part:");
    console.log({x:this.x, y:this.y, dir:this.dir, orders:this.orders});
  }

  newOrder(dir, delay) {
    this.orders.push({
      dir: dir,
      delay: delay
    });
  }

  processOrders() {
    // console.log("processing orders for part:")
    // console.log(this);
    if (this.orders.length === 0) {
      return;
    }

    this.orders.forEach(order => order.delay--);

    if (this.orders[0].delay === 0) {
      const order = this.orders.shift();
      this.dir = order.dir;
    }
  }

  move() {
    switch (this.dir) {
      case "u":
        this.y -= MOVE_AMOUNT;
        this.y = this.y === -size ? height - size : this.y;
        break;
      case "r":
        this.x += MOVE_AMOUNT;
        this.x = this.x === width ? 0 : this.x;
        break;
      case "d":
        this.y += MOVE_AMOUNT;
        this.y = this.y === height ? 0 : this.y;
        break;
      case "l":
        this.x -= MOVE_AMOUNT;
        this.x = this.x === -size ? width - size : this.x;
        break;
      default: console.error("ERROR in SankePart.move(), invalid direction");
    }
  }
}
