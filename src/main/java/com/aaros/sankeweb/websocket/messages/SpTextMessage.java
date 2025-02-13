package com.aaros.sankeweb.websocket.messages;

public class SpTextMessage {
  private final MessageType msgType;
  private final String text;

  public SpTextMessage(MessageType type, String text) {
    msgType = type;
    this.text = text;
  }

  // Getters and setters

  public MessageType getMsgType() {
    return msgType;
  }

  public String getText() {
    return text;
  }
}
