package com.aaros.sankeweb.game.model;

import java.util.ArrayList;
import java.util.List;

public class SankePart {
  private int x;
  private int y;
  private final int index;
  private Direction dir;
  private final List<Order> orders;

  public SankePart(int x, int y, int index, Direction dir, List<Order> orders) {
    this.x = x;
    this.y = y;
    this.index = index;
    this.dir = dir;
    this.orders = orders;
  }

  public SankePart() {
    this.x = -1;
    this.y = -1;
    this.index = -1;
    this.dir = null;
    this.orders = new ArrayList<>();
  }

  public void addOrder(Direction dir) {
    orders.add(new Order(dir, index + 1));
  }

  public void move() {
    if (!orders.isEmpty() && orders.getFirst().getDelay() == 0) {
      dir = orders.getFirst().getDir();
      orders.removeFirst();
    }
    for (Order order : orders) {
      order.decrementDelay();
    }

    int[] newCoords = Board.movePart(dir, x, y);
    x = newCoords[0];
    y = newCoords[1];
  }

  // Getters and setters

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

  public int getIndex() {
    return index;
  }
}
