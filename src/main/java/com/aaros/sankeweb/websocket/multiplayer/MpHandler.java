package com.aaros.sankeweb.websocket.multiplayer;

import com.aaros.sankeweb.websocket.messages.InboundMessage;
import com.aaros.sankeweb.websocket.messages.SWTextMessage;
import com.aaros.sankeweb.websocket.messages.multiplayer.LobbyMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static com.aaros.sankeweb.websocket.messages.MessageType.ERROR;
import static com.aaros.sankeweb.websocket.messages.MessageType.HTML;

@Controller
public class MpHandler extends TextWebSocketHandler {
  private final ObjectMapper mapper;
  private final Map<Integer, Lobby> lobbies;
  private int lobbyIdCounter;
  private final SpringTemplateEngine templateEngine;

  public MpHandler(SpringTemplateEngine templateEngine) {
    this.mapper = new ObjectMapper();
    this.lobbies = new HashMap<>();
    this.lobbyIdCounter = 0;
    this.templateEngine = templateEngine;
  }

  @Override
  public void afterConnectionEstablished(WebSocketSession session) {
    System.out.println("Connection " + session.getId() + " is opened in MpHandler");
    System.out.println("IP: " + Objects.requireNonNull(session.getRemoteAddress()).getAddress().getHostAddress());
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
    final String sessionId = session.getId();

    System.out.println("Connection " + sessionId + " is closed in MpHandler");

    for (var lobby : lobbies.values()) {
      if (lobby.hasPlayer(sessionId)) {
        lobby.removePlayer(session);
      }
    }
  }

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    InboundMessage msg = mapper.readValue(message.getPayload(), InboundMessage.class);

    switch (msg.getType()) {
      case MP_START:
        handleMpStart(session, msg);
        break;
      case KEY_CHANGE:
//        handleKeyChange();
        break;
      case CREATE_LOBBY:
        handleCreateLobby(session);
        break;
      case JOIN_LOBBY:
        handleJoinLobby(session, msg);
        break;
      default:
        throw new RuntimeException("Unknown message type in MpHandler: " + msg.getType());
    }
  }

  private void handleMpStart(WebSocketSession session, InboundMessage msg) throws IOException {
    final int lobbyId = Integer.parseInt(msg.getText());
    final Lobby lobby = lobbies.get(lobbyId);

    final Context ctx = new Context();
    ctx.setVariable("playersNum", lobby.getPlayerCount());

    final String html = templateEngine.process("mp", ctx);
    final SWTextMessage outboundMessage = new SWTextMessage(HTML, html);
    WebSocketSession[] sessions = lobby.getSessionsAsArray();
    for (WebSocketSession webSocketSession : sessions) {
      synchronized (webSocketSession) {
        webSocketSession.sendMessage(new TextMessage(mapper.writeValueAsString(outboundMessage)));
      }
    }

    lobby.startGame();
  }

  private void handleCreateLobby(WebSocketSession session) throws IOException {
    final int lobbyId = lobbyIdCounter;
    lobbyIdCounter++;

    Lobby lobby = new Lobby(session);
    lobbies.put(lobbyId, lobby);

    LobbyMessage lobbyMsg = new LobbyMessage(lobbyId, lobby.getSessionIdsAsArray());
    String json = mapper.writeValueAsString(lobbyMsg);
    session.sendMessage(new TextMessage(json));

    System.out.println("Lobby created");
  }

  private void handleJoinLobby(WebSocketSession session, InboundMessage msg) throws IOException {
    int lobbyId;
    try {
      lobbyId = Integer.parseInt(msg.getText());
    } catch (NumberFormatException e) {
      SWTextMessage textMsg = new SWTextMessage(ERROR, "Invalid input");
      String json = mapper.writeValueAsString(textMsg);
      session.sendMessage(new TextMessage(json));
      return;
    }

    Lobby lobby = lobbies.get(lobbyId);
    System.out.println(lobbies);
    if (lobby == null) {
      SWTextMessage textMsg = new SWTextMessage(ERROR, "No lobby found");
      String json = mapper.writeValueAsString(textMsg);
      session.sendMessage(new TextMessage(json));
      return;
    }
    lobby.addPlayer(session);

    LobbyMessage lobbyMsg = new LobbyMessage(lobbyId, lobby.getSessionIdsAsArray());
    String json = mapper.writeValueAsString(lobbyMsg);

    WebSocketSession[] sessions = lobby.getSessionsAsArray();
    for (WebSocketSession s : sessions) {
      synchronized (s) {
        s.sendMessage(new TextMessage(json));
      }
    }
  }
}
