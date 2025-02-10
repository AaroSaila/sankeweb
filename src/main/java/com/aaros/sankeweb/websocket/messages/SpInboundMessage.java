package com.aaros.sankeweb.websocket.messages;

public class SpInboundMessage {
  private final String gameId;
  private final char key;

  public SpInboundMessage(String gameId, char key) {
    this.gameId = gameId;
    this.key = key;
  }

  public SpInboundMessage() {
    gameId = "-1";
    key = '0';
  }

  public String getGameId() {
    return gameId;
  }

  public char getKey() {
    return key;
  }
}
