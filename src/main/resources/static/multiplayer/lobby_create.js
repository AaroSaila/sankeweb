import Globals from "../globals.js"
import replacePlayers from "./replacePlayers.js";

const ws = new WebSocket(Globals.ws);
ws.onopen = () => {
  console.log("WS Connected", ws);
  ws.send(JSON.stringify({
    type: "CREATE_LOBBY",
    text: ""
  }));
}

ws.onmessage = event => {
  const lobby = JSON.parse(event.data);
  console.log(lobby);

  document.getElementById("lobby-id").textContent = lobby.lobbyId;

  replacePlayers(
    document.getElementById("lobby-players-list"),
    lobby.players
  );
}