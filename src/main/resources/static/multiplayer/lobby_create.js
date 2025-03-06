import Env from "../env.js"
import replacePlayers from "./replacePlayers.js";
import mp from "./mp.js";

const ws = new WebSocket(Env.wsMp);
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
  sessionStorage.setItem("lobbyId", lobby.lobbyId);

  replacePlayers(
    document.getElementById("lobby-players-list"),
    lobby.players
  );
}

document.getElementById("lobby-start").addEventListener("mousedown", () => {
  ws.onmessage = event => {
    document.getElementById("view").innerHTML = JSON.parse(event.data).text;
    mp(ws);
  };
  ws.send(JSON.stringify({
    type: "MP_START",
    text: sessionStorage.getItem("lobbyId")
  }));
});