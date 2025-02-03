export default class BoardDrawer {
  constructor(ctx, width, height, entitySize) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.size = entitySize;

    this.sankeColor = "green";
    this.foodColor = "red";
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawRect(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, this.size, this.size);
  }

  draw(board) {
    this.clear();
    this.drawSanke(board);
    this.drawFood(board);
  }

  drawSanke(board) {
    this.drawRect(board.sanke.x, board.sanke.y, this.sankeColor);
  }

  drawFood(board) {
    this.drawRect(board.food.x, board.food.y, this.foodColor);
  }
}