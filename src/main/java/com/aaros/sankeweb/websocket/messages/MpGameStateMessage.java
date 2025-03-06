package com.aaros.sankeweb.websocket.messages;

import com.aaros.sankeweb.game.controller.GameController;

public class MpGameStateMessage {
  private final GameController mainGame;
  private final GameController[] otherGames;

  public MpGameStateMessage(GameController mainGame, GameController[] otherGames) {
    this.mainGame = mainGame;
    this.otherGames = otherGames;
  }

  // Getters and setters

  public GameController getMainGame() {
    return mainGame;
  }

  public GameController[] getOtherGames() {
    return otherGames;
  }
}
