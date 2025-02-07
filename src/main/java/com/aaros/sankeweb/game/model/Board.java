package com.aaros.sankeweb.game.model;

import java.util.Random;

public class Board {
  private final Sanke sanke;
  private final Food food;

  private final Random rand;

  protected final static int ENTITYSIZE = 20;
  protected final static int WIDTH = 600;
  protected final static int HEIGHT = 600;

  public Board() {
    this.sanke = new Sanke();
    this.food = new Food();
    this.rand = new Random();
  }

  protected static int[] movePart(Direction dir, int x, int y) {
    switch (dir) {
      case UP:
        y -= Board.ENTITYSIZE;
        if (y < 0) {
          y = Board.HEIGHT - Board.ENTITYSIZE;
        }
        break;
      case DOWN:
        y += Board.ENTITYSIZE;
        if (y > Board.HEIGHT - Board.ENTITYSIZE) {
          y = 0;
        }
        break;
      case LEFT:
        x -= Board.ENTITYSIZE;
        if (x < 0) {
          x = Board.WIDTH - Board.ENTITYSIZE;
        }
        break;
      case RIGHT:
        x += Board.ENTITYSIZE;
        if (x > Board.WIDTH - Board.ENTITYSIZE) {
          x = 0;
        }
        break;
    }

    return new int[]{x, y};
  }

  public void moveSanke() {
    this.sanke.move();
  }

  public boolean checkFoodCollision() {
    return this.sanke.getX() == this.food.getX() && this.sanke.getY() == this.food.getY();
  }

  public void addSankePart() {
    sanke.addPart();
  }

  public void newFood() {
    final int max_n = (WIDTH - ENTITYSIZE) / ENTITYSIZE;

    int n = this.rand.nextInt(max_n + 1);
    this.food.setX((n - 1) * ENTITYSIZE);

    do {
      n = this.rand.nextInt(max_n + 1);
    } while (n == this.food.getX());
    this.food.setY((n - 1) * ENTITYSIZE);
  }

  public Sanke getSanke() {
    return sanke;
  }

  public Food getFood() {
    return food;
  }
}
