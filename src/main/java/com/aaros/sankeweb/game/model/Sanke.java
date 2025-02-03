package com.aaros.sankeweb.game.model;

import java.util.ArrayList;
import java.util.List;

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

  public void changeDirection(Direction dir) {
    this.dir = dir;
  }

  public void move() {
    switch (dir) {
      case UP:
        this.y -= Board.ENTITYSIZE;
        break;
      case DOWN:
        this.y += Board.ENTITYSIZE;
        break;
      case LEFT:
        this.x -= Board.ENTITYSIZE;
        break;
      case RIGHT:
        this.x += Board.ENTITYSIZE;
        break;
    }
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

  public List<SankePart> getParts() {
    return parts;
  }

  public void setParts(List<SankePart> parts) {
    this.parts = parts;
  }
}
