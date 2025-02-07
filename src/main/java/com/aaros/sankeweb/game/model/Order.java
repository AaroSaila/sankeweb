package com.aaros.sankeweb.game.model;

public class Order {
  private final Direction dir;
  private int delay;

  public Order(Direction dir, int delay) {
    this.dir = dir;
    this.delay = delay;
  }

  public void decrementDelay() {
    delay--;
  }

  // Getters and setters

  public Direction getDir() {
    return dir;
  }

  public int getDelay() {
    return delay;
  }
}
