package com.aaros.sankeweb.websocket;

import com.aaros.sankeweb.game.controller.GameController;
import com.aaros.sankeweb.game.controller.TickEvent;
import com.aaros.sankeweb.websocket.messages.SpGameStateMessage;
import com.aaros.sankeweb.websocket.messages.SpTextMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

import static com.aaros.sankeweb.game.controller.TickEvent.HIT_TAIL;
import static com.aaros.sankeweb.websocket.messages.MessageType.GAME_OVER;

public class SpGameStateSender extends Thread {
  private final WebSocketSession session;
  private final GameController game;
  private final ObjectMapper mapper;

  SpGameStateSender(WebSocketSession session, int tickRate) {
    this.session = session;
    this.game = new GameController(tickRate);
    this.mapper = new ObjectMapper();
  }

  @Override
  public void run() {
    while (true) {
      long startTime = System.currentTimeMillis();
      if (!session.isOpen()) {
        return;
      }

      TickEvent tick = game.tick();

      if (tick == HIT_TAIL) {
        synchronized (session) {
          try {
            SpTextMessage msg = new SpTextMessage(GAME_OVER, "Game over");
            session.sendMessage(new TextMessage(mapper.writeValueAsString(msg)));
            session.close();
            return;
          } catch (IOException e) {
            throw new RuntimeException(e);
          }
        }
      }

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

  public GameController getGame() {
    return game;
  }

  public ObjectMapper getMapper() {
    return mapper;
  }
}
