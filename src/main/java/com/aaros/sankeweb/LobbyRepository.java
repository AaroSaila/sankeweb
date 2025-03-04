package com.aaros.sankeweb;

import com.aaros.sankeweb.websocket.Lobby;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class LobbyRepository {
  private final Map<Integer, Lobby> lobbies;

  public LobbyRepository() {
    this.lobbies = new HashMap<>();
  }

  public Lobby get(Integer id) {
    return lobbies.get(id);
  }

  public void put(Integer id, Lobby lobby) {
    lobbies.put(id, lobby);
  }

  public int getPlayerCountByIp(String address) {
    for (Lobby lobby : lobbies.values()) {
      if (lobby.hasPlayer(address)) {
        return lobby.getPlayerCount();
      }
    }

    return -1;
  }

  // Getters and setters
  public Map<Integer, Lobby> getLobbies() {
    return lobbies;
  }
}
