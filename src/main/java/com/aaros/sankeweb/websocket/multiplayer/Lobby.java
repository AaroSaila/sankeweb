package com.aaros.sankeweb.websocket.multiplayer;

import com.aaros.sankeweb.websocket.GameStateSender;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Lobby {
  private final List<WebSocketSession> players;
  private GameStateSender[] senders;
  final private String hostId;

  public Lobby(WebSocketSession firstPlayerSession) {
    players = new ArrayList<>();
    senders = null;
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

  public void removePlayer(WebSocketSession session) throws InterruptedException {
    players.remove(session);
    if (senders == null) {
      return;
    }

    for (GameStateSender sender : senders) {
      if (sender.getSessionId().equals(session.getId())) {
        sender.turnOff();
        sender.join();
        return;
      }
    }
  }

  public void keyChange(String sessionId, char key) throws IOException {
    boolean hasPlayer = hasPlayer(sessionId);
    if (!hasPlayer) return;

    GameStateSender sender = null;
    for (GameStateSender s : senders) {
      if (s.getSessionId().equals(sessionId)) {
        sender = s;
      }
    }

    assert sender != null;

    sender.getGame().setKey(key);
  }

  public void startGame() {
    senders = new GameStateSender[players.size()];
    for (int i = 0 ; i < players.size(); i++) {
      senders[i] = new GameStateSender(players.toArray(new WebSocketSession[0]), players.get(i).getId(), 100);
      senders[i].start();
    }
  }

  // Getters and setters

  public String getHostId() {
    return hostId;
  }
}
