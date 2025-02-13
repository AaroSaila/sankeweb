package com.aaros.sankeweb.websocket.messages;

public class LobbyMessage {
  private final MessageType msgType;
  private final int lobbyId;
  private final String sessionId;

  public LobbyMessage(int lobbyId, String sessionId) {
    msgType = MessageType.CREATE_LOBBY;
    this.lobbyId = lobbyId;
    this.sessionId = sessionId;
  }

  // Getters and setters

  public int getLobbyId() {
    return lobbyId;
  }

  public String getSessionId() {
    return sessionId;
  }

  public MessageType getMsgType() {
    return msgType;
  }
}
