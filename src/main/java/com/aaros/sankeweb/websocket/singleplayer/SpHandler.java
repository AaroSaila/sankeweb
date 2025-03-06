package com.aaros.sankeweb.websocket.singleplayer;

import com.aaros.sankeweb.game.controller.GameController;
import com.aaros.sankeweb.websocket.messages.InboundMessage;
import com.aaros.sankeweb.websocket.messages.singleplayer.SpGameStateMessage;
import com.aaros.sankeweb.websocket.messages.SWTextMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static com.aaros.sankeweb.websocket.messages.MessageType.KEY_CHANGE;

@Controller
public class SpHandler extends TextWebSocketHandler {
  private final ObjectMapper mapper;
  private final Map<String, SpGameStateSender> spGameSenders;

  public SpHandler() {
    this.mapper = new ObjectMapper();
    this.spGameSenders = new HashMap<>();
  }

  @Override
  public void afterConnectionEstablished(WebSocketSession session) {
    System.out.println("Connection " + session.getId() + " is opened in SpHandler");
    System.out.println("IP: " + Objects.requireNonNull(session.getRemoteAddress()).getAddress().getHostAddress());
  }

  @Override
  protected void handleTextMessage(WebSocketSession session, org.springframework.web.socket.TextMessage message) throws Exception {
    InboundMessage msg = mapper.readValue(message.getPayload(), InboundMessage.class);
    switch (msg.getType()) {
      case SP_START:
        handleSpStart(session);
        break;
      case KEY_CHANGE:
        handleSpKeyChange(session, msg);
        break;
      default:
        throw new RuntimeException("Unknown message type in SpHandler: " + msg.getType());
    }
  }

  private void handleSpStart(WebSocketSession session) throws IOException {
    SpGameStateSender sender = new SpGameStateSender(session, 100);
    spGameSenders.put(session.getId(), sender);

    String json = mapper.writeValueAsString(new SpGameStateMessage(sender.getGame()));

    session.sendMessage(new org.springframework.web.socket.TextMessage(json));

    sender.start();
  }

  private void handleSpKeyChange(WebSocketSession session, InboundMessage msg) throws IOException {
    GameController game = spGameSenders.get(session.getId()).getGame();
    char key = msg.getText().charAt(0);

    if (key == 'e') {
      session.close();
      return;
    }

    game.setKey(key);

    SWTextMessage textMsg = new SWTextMessage(KEY_CHANGE, "Key changed to: " + game.getKey());

    String json = mapper.writeValueAsString(textMsg);

    synchronized (session) {
      session.sendMessage(new org.springframework.web.socket.TextMessage(json));
    }
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
    System.out.println("Connection " + session.getId() + " is closed");
    spGameSenders.remove(session.getId());
  }
}
