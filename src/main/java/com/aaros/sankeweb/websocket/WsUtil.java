package com.aaros.sankeweb.websocket;

import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.ConcurrentWebSocketSessionDecorator;

public class WsUtil {
  public static ConcurrentWebSocketSessionDecorator makeConcurrent(WebSocketSession session) {
    return new ConcurrentWebSocketSessionDecorator(session, 1000, 10000);
  }
}
