package com.aaros.sankeweb.websocket.messages;

import com.aaros.sankeweb.game.controller.SpGameController;

import static com.aaros.sankeweb.websocket.messages.MessageType.GAMESTATE;

public class SpGameStateMessage {
  private final MessageType msgType;
  private final SpGameController game;

  public SpGameStateMessage(SpGameController game) {
    this.msgType = GAMESTATE;
    this.game = game;
  }

  public MessageType getMsgType() {
    return msgType;
  }

  public SpGameController getGame() {
    return game;
  }
}
