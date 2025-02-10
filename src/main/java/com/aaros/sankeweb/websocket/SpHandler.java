package com.aaros.sankeweb.websocket;

import com.aaros.sankeweb.game.controller.SpGameController;
import com.aaros.sankeweb.websocket.messages.SpGameStateMessage;
import com.aaros.sankeweb.websocket.messages.SpInboundMessage;
import com.aaros.sankeweb.websocket.messages.SpTextMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;

import static com.aaros.sankeweb.websocket.messages.MessageType.KEY_CHANGE;

@Controller
public class SpHandler extends TextWebSocketHandler {
  private final ObjectMapper mapper = new ObjectMapper();
  private final HashMap<String, SpGameStateSender> gameSenders = new HashMap<>();

  @Override
  public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    System.out.println("Connection " + session.getId() + " is opened");
    SpGameStateSender sender = new SpGameStateSender(session, 100);
    gameSenders.put(session.getId(), sender);

    String json = mapper.writeValueAsString(new SpGameStateMessage(sender.getGame()));

    session.sendMessage(new TextMessage(json));

    sender.start();
  }

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    SpInboundMessage msg = mapper.readValue(message.getPayload(), SpInboundMessage.class);
    SpGameController game = gameSenders.get(session.getId()).getGame();

    if (msg.getKey() == 'e') {
      session.close();
      return;
    }

    game.setKey(msg.getKey());

    SpTextMessage msgOut = new SpTextMessage(KEY_CHANGE, session.getId(), "Key changed to: " + game.getKey());

    String json = mapper.writeValueAsString(msgOut);

    synchronized (session) {
      session.sendMessage(new TextMessage(json));
    }
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
    System.out.println("Connection " + session.getId() + " is closed");
    gameSenders.remove(session.getId());
  }
}
