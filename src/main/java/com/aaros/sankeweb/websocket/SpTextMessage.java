package com.aaros.sankeweb.websocket;

public class SpTextMessage {
  private final String msgType;
  private final String gameId;
  private final String text;

  public SpTextMessage(String gameId, String text) {
    this.msgType = "text";
    this.gameId = gameId;
    this.text = text;
  }

  public SpTextMessage() {
    this.msgType = "text";
    this.gameId = "-1";
    this.text = "";
  }

  public String getMsgType() {
    return msgType;
  }

  public String getGameId() {
    return gameId;
  }

  public String getText() {
    return text;
  }
}
