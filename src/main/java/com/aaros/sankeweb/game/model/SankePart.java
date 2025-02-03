package com.aaros.sankeweb.game.model;

import java.util.ArrayList;
import java.util.List;

public class SankePart {
  private int x;
  private int y;
  private Direction dir;
  private final List<Order> orders;

  public SankePart(int x, int y, Direction dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.orders = new ArrayList<>();
  }

  public SankePart() {
    this.x = -1;
    this.y = -1;
    this.dir = null;
    this.orders = new ArrayList<>();
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

  public Direction getDir() {
    return dir;
  }

  public void setDir(Direction dir) {
    this.dir = dir;
  }

  public List<Order> getOrders() {
    return orders;
  }
}
