package com.aaros.sankeweb.websocket.messages.singleplayer;

import com.aaros.sankeweb.game.controller.GameController;
import com.aaros.sankeweb.websocket.messages.MessageType;

import static com.aaros.sankeweb.websocket.messages.MessageType.GAMESTATE;

public class SpGameStateMessage {
  private final MessageType msgType;
  private final GameController game;

  public SpGameStateMessage(GameController game) {
    this.msgType = GAMESTATE;
    this.game = game;
  }

  public GameController getGame() {
    return game;
  }

  public MessageType getMsgType() {
    return msgType;
  }
}
