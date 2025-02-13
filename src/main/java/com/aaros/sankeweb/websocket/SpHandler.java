package com.aaros.sankeweb.websocket;

import com.aaros.sankeweb.game.controller.GameController;
import com.aaros.sankeweb.websocket.messages.InboundMessage;
import com.aaros.sankeweb.websocket.messages.LobbyMessage;
import com.aaros.sankeweb.websocket.messages.SpGameStateMessage;
import com.aaros.sankeweb.websocket.messages.SpTextMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;

import static com.aaros.sankeweb.websocket.messages.MessageType.SP_KEY_CHANGE;

@Controller
public class SpHandler extends TextWebSocketHandler {
  private final ObjectMapper mapper = new ObjectMapper();
  private final HashMap<String, SpGameStateSender> spGameSenders = new HashMap<>();
  private final HashMap<Integer, HashMap<String, SpGameStateSender>> mpLobbies = new HashMap<>();
  private int lobbyIdCounter = 0;

  @Override
  public void afterConnectionEstablished(WebSocketSession session) {
    System.out.println("Connection " + session.getId() + " is opened");
  }

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    InboundMessage msg = mapper.readValue(message.getPayload(), InboundMessage.class);

    String json;
    SpTextMessage textMsg;
    switch (msg.getType()) {
      case SP_START:
        SpGameStateSender sender = new SpGameStateSender(session, 100);
        spGameSenders.put(session.getId(), sender);

        json = mapper.writeValueAsString(new SpGameStateMessage(sender.getGame()));

        session.sendMessage(new TextMessage(json));

        sender.start();
        break;

      case SP_KEY_CHANGE:
        GameController game = spGameSenders.get(session.getId()).getGame();
        char key = msg.getText().charAt(0);

        if (key == 'e') {
          session.close();
          return;
        }

        game.setKey(key);

        textMsg = new SpTextMessage(SP_KEY_CHANGE, "Key changed to: " + game.getKey());

        json = mapper.writeValueAsString(textMsg);

        synchronized (session) {
          session.sendMessage(new TextMessage(json));
        }
        break;

      case CREATE_LOBBY:
        final int lobbyId = lobbyIdCounter;
        lobbyIdCounter++;

        mpLobbies.put(lobbyId, new HashMap<>());
        mpLobbies.get(lobbyId).put(session.getId(), new SpGameStateSender(session, 100));

        LobbyMessage lobbyMsg = new LobbyMessage(lobbyId, session.getId());
        json = mapper.writeValueAsString(lobbyMsg);
        session.sendMessage(new TextMessage(json));

        System.out.println("Lobby created");
        break;
    }
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
    System.out.println("Connection " + session.getId() + " is closed");
    spGameSenders.remove(session.getId());
  }
}
