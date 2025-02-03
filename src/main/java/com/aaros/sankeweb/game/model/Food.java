package com.aaros.sankeweb.game.model;

public class Food {
  private int x;
  private int y;

  public Food() {
    this.x = Board.WIDTH / (Board.WIDTH / 100);
    this.y = Board.HEIGHT / (Board.HEIGHT / 100);
  }

  public int getX() {
    return x;
  }

  public void setX(int x) {
    this.x = x;
  }

  public int getY() {
    return y;
  }

  public void setY(int y) {
    this.y = y;
  }
}
