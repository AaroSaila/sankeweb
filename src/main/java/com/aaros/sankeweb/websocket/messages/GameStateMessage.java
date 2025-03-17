package com.aaros.sankeweb.websocket.messages;

import com.aaros.sankeweb.game.controller.GameController;

import static com.aaros.sankeweb.websocket.messages.MessageType.GAMESTATE;

public class GameStateMessage {
  private final MessageType msgType;
  private final GameController game;
  private final boolean isMain;

  public GameStateMessage(GameController game, boolean isMain) {
    this.msgType = GAMESTATE;
    this.game = game;
    this.isMain = isMain;
  }

  public GameController getGame() {
    return game;
  }

  public MessageType getMsgType() {
    return msgType;
  }

  public boolean getIsMain() {
    return isMain;
  }
}
