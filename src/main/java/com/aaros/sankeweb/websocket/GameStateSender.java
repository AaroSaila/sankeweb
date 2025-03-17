package com.aaros.sankeweb.websocket;

import com.aaros.sankeweb.game.controller.GameController;
import com.aaros.sankeweb.game.controller.TickEvent;
import com.aaros.sankeweb.websocket.messages.SWTextMessage;
import com.aaros.sankeweb.websocket.messages.GameStateMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

import static com.aaros.sankeweb.game.controller.TickEvent.HIT_TAIL;
import static com.aaros.sankeweb.websocket.messages.MessageType.GAME_OVER;

public class GameStateSender extends Thread {
  private final WebSocketSession[] sessions;
  private final GameController game;
  private final ObjectMapper mapper;
  private boolean running;

  public GameStateSender(WebSocketSession[] sessions, String sessionId, int tickRate) {
    this.sessions = sessions;
    this.game = new GameController(tickRate, sessionId);
    this.mapper = new ObjectMapper();
    this.running = true;
  }

  @Override
  public void run() {
    while (true) {
      long startTime = System.currentTimeMillis();

      if (!running) {
        return;
      }

      TickEvent tick = game.tick();

      if (tick == HIT_TAIL) {
        for (WebSocketSession session : sessions) {
          try {
            SWTextMessage msg = new SWTextMessage(GAME_OVER, session.getId());
            session.sendMessage(new TextMessage(mapper.writeValueAsString(msg)));
            return;
          } catch (IOException e) {
            throw new RuntimeException(e);
          }
        }
      }

      try {
        TextMessage mainMsg = new TextMessage(mapper.writeValueAsString(new GameStateMessage(game, true)));
        TextMessage otherMsg = new TextMessage(mapper.writeValueAsString(new GameStateMessage(game, false)));

        final long totalTime = System.currentTimeMillis() - startTime;

        final int tickRate = game.getTickRate();
        if (totalTime < tickRate) {
          Thread.sleep(tickRate - totalTime);
        }

        for (WebSocketSession session : sessions) {
          try {
            if (session.getId().equals(game.getSessionId())) {
              session.sendMessage(mainMsg);
            } else {
              session.sendMessage(otherMsg);
            }
          } catch (IllegalStateException _) {
          }
        }
      } catch (IOException | InterruptedException e) {
        throw new RuntimeException(e);
      }

    }
  }

  public String getSessionId() {
    return game.getSessionId();
  }

  public void turnOff() {
    running = false;
  }

  public GameController getGame() {
    return game;
  }
}
