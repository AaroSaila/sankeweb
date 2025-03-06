package com.aaros.sankeweb.websocket.multiplayer;

import org.springframework.web.socket.WebSocketSession;

import java.util.ArrayList;
import java.util.List;

public class Lobby {
  private final List<WebSocketSession> players;
  private MpGameStateSender sender;
  final private String hostId;

  public Lobby(WebSocketSession firstPlayerSession) {
    players = new ArrayList<>();
    sender = null;
    hostId = firstPlayerSession.getId();

    players.add(firstPlayerSession);
  }

  public WebSocketSession[] getSessionsAsArray() {
    return players.toArray(new WebSocketSession[0]);
  }

  public String[] getSessionIdsAsArray() {
    final String[] ids = new String[players.size()];
    for (int i = 0; i < players.size(); i++) {
      ids[i] = players.get(i).getId();
    }
    return ids;
  }

  public boolean hasPlayer(String sessionId) {
    for (WebSocketSession session : players) {
      if (session.getId().equals(sessionId)) {
        return true;
      }
    }

    return false;
  }

  public int getPlayerCount() {
    return players.size();
  }

  public void addPlayer(WebSocketSession newPlayerSession) {
    players.add(newPlayerSession);
  }

  public void removePlayer(WebSocketSession session) {
    players.remove(session);
    if (sender != null) {
      sender.removePlayer(session);
    }
  }

  public void startGame() {
    sender = new MpGameStateSender(players);
    new Thread(sender).start();
  }

  // Getters and setters

  public String getHostId() {
    return hostId;
  }
}
