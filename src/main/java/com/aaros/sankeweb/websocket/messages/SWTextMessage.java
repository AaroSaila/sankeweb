package com.aaros.sankeweb.websocket.messages;

public class SWTextMessage {
  private final MessageType msgType;
  private final String text;

  public SWTextMessage(MessageType type, String text) {
    msgType = type;
    this.text = text;
  }

  public MessageType getMsgType() {
    return msgType;
  }

  public String getText() {
    return text;
  }
}
