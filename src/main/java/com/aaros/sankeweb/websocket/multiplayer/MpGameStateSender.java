package com.aaros.sankeweb.websocket.multiplayer;

import com.aaros.sankeweb.game.controller.GameController;
import com.aaros.sankeweb.websocket.messages.multiplayer.MpGameStateMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MpGameStateSender extends Thread {
  private final WebSocketSession[] sessions;
  private final Map<String, GameController> games;
  private final ObjectMapper mapper;

  public MpGameStateSender(List<WebSocketSession> sessions) {
    this.sessions = sessions.toArray(new WebSocketSession[0]);
    this.games = new HashMap<>();
    this.mapper = new ObjectMapper();

    for (var session : sessions) {
      GameController game = new GameController(100, session.getId());
      games.put(session.getId(), game);
    }
  }

  @Override
  public void run() {
    Thread[] tickers = new Thread[games.size()];
    int i = 0;
    for (var game : games.values()) {
      if (game == null) continue;

      tickers[i] = new Thread(game::tick);
      tickers[i].start();
      i++;
    }

    for (var session : sessions) {
      if (session == null) continue;

      final String sessionId = session.getId();

      GameController mainGame = games.get(sessionId);
      GameController[] otherGames = new GameController[games.size() - 1];

      i = 0;
      for (var gameEntry : games.entrySet()) {
        if (!gameEntry.getKey().equals(sessionId)) {
          otherGames[i] = gameEntry.getValue();
          i++;
        }
      }

      for (var ticker : tickers) {
        try {
          ticker.join();
        } catch (InterruptedException e) {
          throw new RuntimeException(e);
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

  public void removePlayer(WebSocketSession session) {
    final String sessionId = session.getId();

    for (var gameEntry : games.entrySet()) {
      if (gameEntry.getKey().equals(sessionId)) {
        games.put(sessionId, null);
      }
    }

    for (int i = 0; i < sessions.length; i++) {
      if (sessions[i].getId().equals(sessionId)) {
        sessions[i] = null;
      }
    }
  }
}
