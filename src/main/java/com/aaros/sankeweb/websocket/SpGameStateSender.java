package com.aaros.sankeweb.websocket;

import com.aaros.sankeweb.game.controller.SpGameController;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

public class SpGameStateSender extends Thread {
  private final WebSocketSession session;
  private final SpGameController game;
  private final ObjectMapper mapper;

  SpGameStateSender(WebSocketSession session, int tickRate) {
    this.session = session;
    this.game = new SpGameController(tickRate);
    this.mapper = new ObjectMapper();
  }

  @Override
  public void run() {
    while (true) {
      long startTime = System.currentTimeMillis();
      if (!session.isOpen()) {
        return;
      }

      game.tick();

      SpGameStateMessage msg = new SpGameStateMessage(game);

      long totalTime = System.currentTimeMillis() - startTime;

      if (totalTime < game.getTickRate()) {
        try {
          Thread.sleep(game.getTickRate() - totalTime);
        } catch (InterruptedException e) {
          throw new RuntimeException(e);
        }
      }

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

  public WebSocketSession getSession() {
    return session;
  }

  public SpGameController getGame() {
    return game;
  }

  public ObjectMapper getMapper() {
    return mapper;
  }
}
