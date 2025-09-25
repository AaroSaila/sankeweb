import Entity from "./Entity.js";

export default class SnakePart implements Entity {
  x: number;
  y: number;

  constructor(x: number, y:number) {
    this.x = x;
    this.y = y;
  }
}