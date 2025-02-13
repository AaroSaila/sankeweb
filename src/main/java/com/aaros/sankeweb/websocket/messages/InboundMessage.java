package com.aaros.sankeweb.websocket.messages;

public class InboundMessage {
  private final MessageType type;
  private final String text;

  public InboundMessage(MessageType type, String text) {
    this.type = type;
    this.text = text;
  }

  public InboundMessage() {
    type = MessageType.GAME_OVER;
    text = "-1";
  }

  // Getters and setters

  public String getText() {
    return text;
  }

  public MessageType getType() {
    return type;
  }
}
