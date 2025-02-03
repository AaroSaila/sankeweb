package com.aaros.sankeweb.game.model;

import java.util.Random;

public class Board {
  private final Sanke sanke;
  private final Food food;

  private final Random rand;

  public final static int ENTITYSIZE = 20;
  public final static int WIDTH = 600;
  public final static int HEIGHT = 600;

  public Board() {
    this.sanke = new Sanke();
    this.food = new Food();
    this.rand = new Random();
  }

  public void moveSanke() {
    this.sanke.move();
  }

  public boolean checkFoodCollision() {
    return this.sanke.getX() == this.food.getX() && this.sanke.getY() == this.food.getY();
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
