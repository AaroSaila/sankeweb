package com.aaros.sankeweb.websocket.messages.multiplayer;

import com.aaros.sankeweb.websocket.messages.MessageType;

public class LobbyMessage {
  private final MessageType msgType;
  private final int lobbyId;
  private final String[] players;

  public LobbyMessage(int lobbyId, String[] players) {
    msgType = MessageType.LOBBY;
    this.lobbyId = lobbyId;
    this.players = players;
  }

  // Getters and setters

  public MessageType getMsgType() {
    return msgType;
  }

  public int getLobbyId() {
    return lobbyId;
  }

  public String[] getPlayers() {
    return players;
  }
}
