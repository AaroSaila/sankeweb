package com.aaros.sankeweb.websocket;

import com.aaros.sankeweb.game.controller.SpGameController;

public class SpGameStateMessage {
  private final String msgType;
  private final SpGameController game;

  public SpGameStateMessage(SpGameController game) {
    this.msgType = "gamestate";
    this.game = game;
  }

  public String getMsgType() {
    return msgType;
  }

  public SpGameController getGame() {
    return game;
  }
}
