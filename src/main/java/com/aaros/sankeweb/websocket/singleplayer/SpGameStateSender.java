package com.aaros.sankeweb.websocket.singleplayer;

import com.aaros.sankeweb.game.controller.GameController;
import com.aaros.sankeweb.game.controller.TickEvent;
import com.aaros.sankeweb.websocket.messages.singleplayer.SpGameStateMessage;
import com.aaros.sankeweb.websocket.messages.SWTextMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

import static com.aaros.sankeweb.game.controller.TickEvent.HIT_TAIL;
import static com.aaros.sankeweb.websocket.messages.MessageType.GAME_OVER;

public class SpGameStateSender extends Thread {
  private final WebSocketSession[] sessions;
  private final GameController game;
  private final ObjectMapper mapper;
  private boolean running;

  public SpGameStateSender(WebSocketSession[] sessions, String sessionId, int tickRate) {
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


      long totalTime = System.currentTimeMillis() - startTime;

      while (totalTime < game.getTickRate()) {
        Thread.yield();
        totalTime = System.currentTimeMillis() - startTime;
      }

      for (WebSocketSession session : sessions) {
        try {
          final boolean isMain = session.getId().equals(game.getSessionId());
          SpGameStateMessage msg = new SpGameStateMessage(game, isMain);
          String json = mapper.writeValueAsString(msg);
          TextMessage textMessage = new TextMessage(json);
//          System.out.println(textMessage);
          session.sendMessage(textMessage);
        } catch (IOException e) {
          throw new RuntimeException(e);
        } catch (IllegalStateException _) {
        }
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
