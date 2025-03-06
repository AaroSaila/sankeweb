package com.aaros.sankeweb.websocket;

import com.aaros.sankeweb.websocket.multiplayer.MpHandler;
import com.aaros.sankeweb.websocket.singleplayer.SpHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Configuration
@EnableWebSocket
public class WsConfig implements WebSocketConfigurer {
  private final SpringTemplateEngine templateEngine;

  public WsConfig(SpringTemplateEngine templateEngine) {
    this.templateEngine = templateEngine;
  }

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry.addHandler(spHandler(), "/ws/sp");
    registry.addHandler(mpHandler(), "/ws/mp");
  }

  @Bean
  public SpHandler spHandler() {
    return new SpHandler();
  }

  @Bean
  public MpHandler mpHandler() {
    return new MpHandler(templateEngine);
  }
}
