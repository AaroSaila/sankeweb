package com.aaros.sankeweb.websocket.messages;

public class SpTextMessage {
  private final MessageType msgType;
  private final String gameId;
  private final String text;

  public SpTextMessage(MessageType type, String gameId, String text) {
    msgType = type;
    this.gameId = gameId;
    this.text = text;
  }

  // Getters and setters

  public MessageType getMsgType() {
    return msgType;
  }

  public String getGameId() {
    return gameId;
  }

  public String getText() {
    return text;
  }
}
