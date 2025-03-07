package com.aaros.sankeweb.websocket.singleplayer;

import com.aaros.sankeweb.game.controller.GameController;
import com.aaros.sankeweb.game.controller.TickEvent;
import com.aaros.sankeweb.websocket.messages.singleplayer.SpGameStateMessage;
import com.aaros.sankeweb.websocket.messages.SWTextMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    this.game = new GameController(tickRate, session.getId());
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
            SWTextMessage msg = new SWTextMessage(GAME_OVER, "Game over");
            session.sendMessage(new org.springframework.web.socket.TextMessage(mapper.writeValueAsString(msg)));
            session.close();
            return;
          } catch (IOException e) {
            throw new RuntimeException(e);
          }
        }
      }

      SpGameStateMessage msg = new SpGameStateMessage(game);

      long totalTime = System.currentTimeMillis() - startTime;

      while (totalTime < game.getTickRate()) {
        Thread.yield();
        totalTime = System.currentTimeMillis() - startTime;
      }

      if (session.isOpen()) {
        try {
          String json = mapper.writeValueAsString(msg);
          synchronized (session) {
            session.sendMessage(new org.springframework.web.socket.TextMessage(json));
          }
        } catch (IOException e) {
          throw new RuntimeException(e);
        }
      }
    }
  }

  public GameController getGame() {
    return game;
  }
}
