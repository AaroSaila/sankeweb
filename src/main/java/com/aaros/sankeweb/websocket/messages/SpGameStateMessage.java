package com.aaros.sankeweb.websocket.messages;

import com.aaros.sankeweb.game.controller.GameController;

import static com.aaros.sankeweb.websocket.messages.MessageType.GAMESTATE;

public class SpGameStateMessage {
  private final MessageType msgType;
  private final GameController game;

  public SpGameStateMessage(GameController game) {
    this.msgType = GAMESTATE;
    this.game = game;
  }

  public MessageType getMsgType() {
    return msgType;
  }

  public GameController getGame() {
    return game;
  }
}
