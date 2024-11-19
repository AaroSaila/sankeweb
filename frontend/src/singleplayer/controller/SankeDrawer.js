"use strict";


export default class SankeDrawer {
  constructor(sanke, ctx, color, innerColor, boardWidth, boardHeight, entitySize) {
    this.sanke = sanke;
    this.ctx = ctx;
    this.color = color;
    this.innerColor = innerColor;
    this.boardW = boardWidth;
    this.boardH = boardHeight;
    this.size = entitySize;

    this.innerOffset = 5;
    this.innerSizeDiff = this.innerOffset * 2;
  }

  draw() {
    // Draw outer color
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.sanke.head.x, this.sanke.head.y, this.size, this.size);
    this.sanke.parts.forEach(part => this.ctx.fillRect(part.x, part.y, this.size, this.size));

    // Draw inner color
    this.ctx.fillStyle = "black";
    let innerX = this.sanke.head.x + this.innerOffset;
    let innerY = this.sanke.head.y + this.innerOffset;
    const innerSize = this.size - this.innerSizeDiff;

    this.ctx.fillRect(innerX, innerY, innerSize, innerSize);

    this.ctx.fillStyle = this.innerColor;
    this.sanke.parts.forEach(part => {
      innerX = part.x + this.innerOffset;
      innerY = part.y + this.innerOffset;
      this.ctx.fillRect(innerX, innerY, this.innerSizeDiff, this.innerSizeDiff);
    });
  }
}
