package com.aaros.sankeweb.websocket.messages.multiplayer;

import com.aaros.sankeweb.game.controller.GameController;
import com.aaros.sankeweb.websocket.messages.MessageType;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import static com.aaros.sankeweb.websocket.messages.MessageType.GAMESTATE;

public class MpGameStateMessage {
  private final GameController mainGame;
  private final GameController[] otherGames;
  private final MessageType msgType;

  public MpGameStateMessage(GameController mainGame, GameController[] otherGames) {
    this.mainGame = mainGame;
    this.otherGames = otherGames;
    this.msgType = GAMESTATE;
  }

  // Getters and setters

  public GameController getMainGame() {
    return mainGame;
  }

  public GameController[] getOtherGames() {
    return otherGames;
  }

  public MessageType getMsgType() {
    return msgType;
  }
}
