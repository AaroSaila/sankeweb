import Env from "../env.js"
import replacePlayers from "./replacePlayers.js";


const ws = new WebSocket(Env.ws);

const joinBtn = document.getElementById("lobby-join-button");
const idInput = document.getElementById("lobby-id-input");

joinBtn.addEventListener("mousedown", () => {
  ws.send(JSON.stringify({
    type: "JOIN_LOBBY",
    text: idInput.value
  }));
  ws.onmessage = event => {
    const lobby = JSON.parse(event.data);
    console.log(lobby);

    if (lobby.msgType === "ERROR") {
      alert(lobby.text);
      return;
    }

    document.getElementById("lobby-id").textContent = lobby.lobbyId;

    replacePlayers(
      document.getElementById("lobby-players-list"),
      lobby.players
    );

    document.getElementById("lobby-id-input-div").classList.add("hidden");
  }
});