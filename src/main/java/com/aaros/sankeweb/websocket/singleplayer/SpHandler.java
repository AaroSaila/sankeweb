package com.aaros.sankeweb.websocket.singleplayer;

import com.aaros.sankeweb.game.controller.GameController;
import com.aaros.sankeweb.websocket.GameStateSender;
import com.aaros.sankeweb.websocket.WsUtil;
import com.aaros.sankeweb.websocket.messages.GameStateMessage;
import com.aaros.sankeweb.websocket.messages.InboundMessage;
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
  private final Map<String, GameStateSender> spGameSenders;

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
    session = WsUtil.makeConcurrent(session);

    WebSocketSession[] sessionArray = new WebSocketSession[1];
    sessionArray[0] = session;
    GameStateSender sender = new GameStateSender(sessionArray, session.getId(), 100);
    spGameSenders.put(session.getId(), sender);

    String json = mapper.writeValueAsString(new GameStateMessage(sender.getGame(), true));

    session.sendMessage(new org.springframework.web.socket.TextMessage(json));

    sender.start();
  }

  private void handleSpKeyChange(WebSocketSession session, InboundMessage msg) throws IOException {
    final GameStateSender sender = spGameSenders.get(session.getId());
    final GameController game = sender.getGame();
    session = sender.getFirstSession();
    final char key = msg.getText().charAt(0);

    if (key == 'e') {
      session.close();
      return;
    }

    game.setKey(key);

    final SWTextMessage textMsg = new SWTextMessage(KEY_CHANGE, "Key changed to: " + game.getKey());

    final String json = mapper.writeValueAsString(textMsg);

    session.sendMessage(new org.springframework.web.socket.TextMessage(json));
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws InterruptedException {
    System.out.println("Connection " + session.getId() + " is closed");
    GameStateSender sender = spGameSenders.get(session.getId());
    sender.turnOff();
    sender.join();
    spGameSenders.remove(session.getId());
  }
}
