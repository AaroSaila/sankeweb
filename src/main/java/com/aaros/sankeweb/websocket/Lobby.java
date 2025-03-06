package com.aaros.sankeweb.websocket;

import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.Objects;

public class Lobby {
  private final HashMap<String, WebSocketSession> sessions;

  public Lobby(WebSocketSession firstPlayerSession) {
    sessions = new HashMap<>();

    String address = Objects.requireNonNull(firstPlayerSession.getRemoteAddress()).getAddress().getHostAddress();

    sessions.put(address, firstPlayerSession);
  }

  public WebSocketSession[] getSessionsAsArray() {
    return sessions.values().toArray(new WebSocketSession[0]);
  }

  public String[] getPlayersAsArray() {
    return sessions.keySet().toArray(new String[0]);
  }

  public boolean hasPlayer(String address) {
    return sessions.containsKey(address);
  }

  public int getPlayerCount() {
    return sessions.size();
  }

  public void addPlayer(WebSocketSession newPlayerSession) {
    String address = Objects.requireNonNull(newPlayerSession.getRemoteAddress()).getAddress().getHostAddress();
    sessions.put(address, newPlayerSession);
  }

  public void startGame() {
    new Thread(new MpGameStateSender(sessions)).start();
  }
}
