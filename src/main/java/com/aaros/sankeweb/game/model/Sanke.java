package com.aaros.sankeweb.game.model;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import static com.aaros.sankeweb.game.model.Direction.*;

public class Sanke {
  private int x;
  private int y;
  private Direction dir;
  private List<SankePart> parts;


  public Sanke() {
    this.x = Board.WIDTH / 2;
    this.y = Board.HEIGHT / 2;
    this.dir = UP;
    this.parts = new ArrayList<>();
  }

  public void changeDirection(Direction newDir) {
    dir = newDir;

    if (!parts.isEmpty()) {
      for (SankePart part : parts) {
        part.addOrder(newDir);
      }
    }
  }

  public void move() {
    int[] newCoords = Board.movePart(dir, x, y);
    x = newCoords[0];
    y = newCoords[1];

    for (SankePart part : parts) {
      part.move();
    }
  }

  public void addPart() {
    int lastX;
    int lastY;
    Direction lastDir;
    ArrayList<Order> orders;

    try {
      SankePart lastPart = parts.getLast();
      lastX = lastPart.getX();
      lastY = lastPart.getY();
      lastDir = lastPart.getDir();
      orders = new ArrayList<>();
      for (Order order : lastPart.getOrders()) {
        Order newOrder = new Order(order.getDir(), order.getDelay() + 1);
        orders.add(newOrder);
      }
    } catch (NoSuchElementException e) {
      lastX = this.x;
      lastY = this.y;
      lastDir = dir;
      orders = new ArrayList<>();
    }

    int x = -1;
    int y = -1;

    switch (lastDir) {
      case UP:
        y = lastY + Board.ENTITYSIZE;
        x = lastX;
        if (y > Board.HEIGHT - Board.ENTITYSIZE) {
          y = 0;
        }
        break;
      case DOWN:
        y = lastY - Board.ENTITYSIZE;
        x = lastX;
        if (y < 0) {
          y = Board.HEIGHT - Board.ENTITYSIZE;
        }
        break;
      case LEFT:
        x = lastX + Board.ENTITYSIZE;
        y = lastY;
        if (x > Board.WIDTH - Board.ENTITYSIZE) {
          x = 0;
        }
        break;
      case RIGHT:
        x = lastX - Board.ENTITYSIZE;
        y = lastY;
        if (x < 0) {
          x = Board.WIDTH - Board.ENTITYSIZE;
        }
        break;
    }

    SankePart newPart = new SankePart(x, y, parts.size(), lastDir, orders);
    parts.add(newPart);
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

  public List<SankePart> getParts() {
    return parts;
  }

  public void setParts(List<SankePart> parts) {
    this.parts = parts;
  }
}
