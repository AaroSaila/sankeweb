package com.aaros.sankeweb.game.controller;

import com.aaros.sankeweb.game.model.Board;
import com.aaros.sankeweb.game.model.Sanke;

import static com.aaros.sankeweb.game.model.Direction.*;

public class SpGameController {
  private final Board board;
  private int score;
  private char key;
  private int tickRate;

  public SpGameController(int tickRate) {
    this.board = new Board();
    this.score = 0;
    this.key = 'w';
    this.tickRate = tickRate;
  }

  public void handleKey() {
    Sanke sanke = this.board.getSanke();

    switch (this.key) {
      case 'w':
        sanke.changeDirection(UP);
        break;
      case 's':
        sanke.changeDirection(DOWN);
        break;
      case 'a':
        sanke.changeDirection(LEFT);
        break;
      case 'd':
        sanke.changeDirection(RIGHT);
        break;
    }
  }

  public void tick() {
    board.moveSanke();
    if (board.checkFoodCollision()) {
      board.addSankePart();
      score++;
      board.newFood();
      tickRate += 10;
    }
    handleKey();
  }

  public Board getBoard() {
    return board;
  }

  public int getScore() {
    return score;
  }

  public char getKey() {
    return key;
  }

  public void setKey(char key) {
    this.key = key;
  }

  public void setScore(int score) {
    this.score = score;
  }

  public int getTickRate() {
    return tickRate;
  }

  public void setTickRate(int tickRate) {
    this.tickRate = tickRate;
  }
}
