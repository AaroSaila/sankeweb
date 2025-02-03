package com.aaros.sankeweb.game.controller;

import com.aaros.sankeweb.game.model.Board;
import com.aaros.sankeweb.game.model.Sanke;

import static com.aaros.sankeweb.game.model.Direction.*;

public class SpGameController {
  private final String id;
  private final Board board;
  private int score;
  private char key;

  public SpGameController(String id) {
    this.id = id;
    this.board = new Board();
    this.score = 0;
    this.key = 'w';
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
    this.handleKey();
    this.board.moveSanke();
    if (this.board.checkFoodCollision()) {
      this.score++;
      this.board.newFood();
    }
  }

  public Board getBoard() {
    return board;
  }

  public String getId() {
    return id;
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
}
