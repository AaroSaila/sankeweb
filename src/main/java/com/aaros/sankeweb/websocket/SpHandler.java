package com.aaros.sankeweb.websocket;

import com.aaros.sankeweb.game.controller.SpGameController;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

@EnableScheduling
@Controller
public class SpHandler extends TextWebSocketHandler {
  private final ObjectMapper mapper = new ObjectMapper();
  private final HashMap<String, SpGameController> games = new HashMap<>();
  private final ArrayList<WebSocketSession> sessions = new ArrayList<>();

  @Scheduled(fixedRate = 500)
  public void sendGameState() throws IOException {
    if (sessions.isEmpty()) {
      return;
    }
    for (WebSocketSession session : sessions) {
      SpGameController game = games.get(session.getId());
      game.tick();

      SpGameStateMessage msg = new SpGameStateMessage(game);

      String json = mapper.writeValueAsString(msg);

      session.sendMessage(new TextMessage(json));
    }
  }

  @Override
  public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    sessions.add(session);
    SpGameController game = new SpGameController(session.getId());
    games.put(session.getId(), game);

    String json = mapper.writeValueAsString(game);

    session.sendMessage(new TextMessage(json));
  }

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    SpInboundMessage msg = mapper.readValue(message.getPayload(), SpInboundMessage.class);
    SpGameController game = games.get(session.getId());

    game.setKey(msg.getKey());

    SpTextMessage msgOut = new SpTextMessage(game.getId(), "Key changed to: " + game.getKey());

    String json = mapper.writeValueAsString(msgOut);

    session.sendMessage(new TextMessage(json));
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
    sessions.removeIf(session2 -> session2.getId().equals(session.getId()));
  }
}
