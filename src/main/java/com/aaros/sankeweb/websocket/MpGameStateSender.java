package com.aaros.sankeweb.websocket;

import com.aaros.sankeweb.game.controller.GameController;
import com.aaros.sankeweb.websocket.messages.MpGameStateMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class MpGameStateSender extends Thread {
  private final Map<String, WebSocketSession> sessions;
  private final Map<String, GameController> games;
  private final ObjectMapper mapper;

  public MpGameStateSender(HashMap<String, WebSocketSession> sessions) {
    this.sessions = sessions;
    this.games = new HashMap<>();
    this.mapper = new ObjectMapper();

    for (var entry : sessions.entrySet()) {
      GameController game = new GameController(100);
      games.put(entry.getKey(), game);
    }
  }

  @Override
  public void run() {
    Thread[] tickers = new Thread[games.size()];
    int i = 0;
    for (var game : games.values()) {
      tickers[i] = new Thread(game::tick);
      tickers[i].start();
      i++;
    }

    for (var session : sessions.values()) {
      GameController mainGame = games.get(session.getId());
      GameController[] otherGames = new GameController[games.size() - 1];
      i = 0;
      for (var entry : games.entrySet()) {
        if (!entry.getKey().equals(session.getId())) {
          otherGames[i] = entry.getValue();
          i++;
        }
      }

      MpGameStateMessage msg = new MpGameStateMessage(mainGame, otherGames);

      if (session.isOpen()) {
        try {
          String json = mapper.writeValueAsString(msg);
          synchronized (session) {
            session.sendMessage(new TextMessage(json));
          }
        } catch (IOException e) {
          throw new RuntimeException(e);
        }
      }
    }
  }

  // Getters and setters

  public Map<String, WebSocketSession> getSessions() {
    return sessions;
  }

  public Map<String, GameController> getGames() {
    return games;
  }
}
