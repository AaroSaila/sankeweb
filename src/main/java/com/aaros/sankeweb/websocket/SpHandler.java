package com.aaros.sankeweb.websocket;

import com.aaros.sankeweb.game.controller.GameController;
import com.aaros.sankeweb.websocket.messages.InboundMessage;
import com.aaros.sankeweb.websocket.messages.LobbyMessage;
import com.aaros.sankeweb.websocket.messages.SpGameStateMessage;
import com.aaros.sankeweb.websocket.messages.SpTextMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Objects;

import static com.aaros.sankeweb.websocket.messages.MessageType.ERROR;
import static com.aaros.sankeweb.websocket.messages.MessageType.SP_KEY_CHANGE;

@Controller
public class SpHandler extends TextWebSocketHandler {
  private final ObjectMapper mapper = new ObjectMapper();
  private final HashMap<String, SpGameStateSender> spGameSenders = new HashMap<>();
  private final HashMap<Integer, Lobby> mpLobbies = new HashMap<>();
  private int lobbyIdCounter = 0;

  @Override
  public void afterConnectionEstablished(WebSocketSession session) {
    System.out.println("Connection " + session.getId() + " is opened");
    System.out.println("IP: " + Objects.requireNonNull(session.getRemoteAddress()).getAddress().getHostAddress());
  }

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    InboundMessage msg = mapper.readValue(message.getPayload(), InboundMessage.class);
    switch (msg.getType()) {
      case SP_START:
        handleSpStart(session);
        break;
      case SP_KEY_CHANGE:
        handleSpKeyChange(session, msg);
        break;
      case CREATE_LOBBY:
        handleCreateLobby(session);
        break;
      case JOIN_LOBBY:
        handleJoinLobby(session, msg);
        break;
      case MP_START:
        handleMpStart(msg);
        break;
    }
  }

  private void handleSpStart(WebSocketSession session) throws IOException {
    SpGameStateSender sender = new SpGameStateSender(session, 100);
    spGameSenders.put(session.getId(), sender);

    String json = mapper.writeValueAsString(new SpGameStateMessage(sender.getGame()));

    session.sendMessage(new TextMessage(json));

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

    SpTextMessage textMsg = new SpTextMessage(SP_KEY_CHANGE, "Key changed to: " + game.getKey());

    String json = mapper.writeValueAsString(textMsg);

    synchronized (session) {
      session.sendMessage(new TextMessage(json));
    }
  }

  private void handleCreateLobby(WebSocketSession session) throws IOException {
    final int lobbyId = lobbyIdCounter;
    lobbyIdCounter++;

    Lobby lobby = new Lobby(session);
    mpLobbies.put(lobbyId, lobby);

    LobbyMessage lobbyMsg = new LobbyMessage(lobbyId, lobby.getPlayersAsArray());
    String json = mapper.writeValueAsString(lobbyMsg);
    session.sendMessage(new TextMessage(json));

    System.out.println("Lobby created");
  }

  private void handleJoinLobby(WebSocketSession session, InboundMessage msg) throws IOException {
    int lobbyId;
    try {
      lobbyId = Integer.parseInt(msg.getText());
    } catch (NumberFormatException e) {
      SpTextMessage textMsg = new SpTextMessage(ERROR, "Invalid input");
      String json = mapper.writeValueAsString(textMsg);
      session.sendMessage(new TextMessage(json));
      return;
    }

    Lobby lobby = mpLobbies.get(lobbyId);
    if (lobby == null) {
      SpTextMessage textMsg = new SpTextMessage(ERROR, "No lobby found");
      String json = mapper.writeValueAsString(textMsg);
      session.sendMessage(new TextMessage(json));
      return;
    }
    lobby.addPlayer(session);

    LobbyMessage lobbyMsg = new LobbyMessage(lobbyId, lobby.getPlayersAsArray());
    String json = mapper.writeValueAsString(lobbyMsg);

    WebSocketSession[] sessions = lobby.getSessionsAsArray();
    for (WebSocketSession s : sessions) {
      synchronized (s) {
        s.sendMessage(new TextMessage(json));
      }
    }
  }

  private void handleMpStart(InboundMessage msg) throws IOException {
    int lobbyId = Integer.parseInt(msg.getText());

    Lobby lobby = mpLobbies.get(lobbyId);

    lobby.startGame();
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
    System.out.println("Connection " + session.getId() + " is closed");
    spGameSenders.remove(session.getId());
  }
}
