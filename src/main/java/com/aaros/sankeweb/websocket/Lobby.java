package com.aaros.sankeweb.websocket;

import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.Objects;

public class Lobby {
  private final HashMap<String, SpGameStateSender> senders;
  private final HashMap<String, WebSocketSession> sessions;

  public Lobby(WebSocketSession firstPlayerSession) {
    senders = new HashMap<>();
    sessions = new HashMap<>();

    String address = Objects.requireNonNull(firstPlayerSession.getRemoteAddress()).getAddress().getHostAddress();

    senders.put(address, new SpGameStateSender(firstPlayerSession, 100));
    sessions.put(address, firstPlayerSession);
  }

  public WebSocketSession[] getSessionsAsArray() {
    return sessions.values().toArray(new WebSocketSession[0]);
  }

  public String[] getPlayersAsArray() {
    return sessions.keySet().toArray(new String[0]);
  }

  public void addPlayer(WebSocketSession newPlayerSession) {
    String address = Objects.requireNonNull(newPlayerSession.getRemoteAddress()).getAddress().getHostAddress();
    senders.put(address, new SpGameStateSender(newPlayerSession, 100));
    sessions.put(address, newPlayerSession);
  }

  public void startGame() {
    for (SpGameStateSender sender : senders.values()) {
      sender.start();
    }
  }
}
