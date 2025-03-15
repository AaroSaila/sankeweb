import Env from "../env.js"
import replacePlayers from "./replacePlayers.js";
import mp from "./mp.js";


const ws = new WebSocket(Env.wsMp);

const joinBtn = document.getElementById("lobby-join-button");
const idInput = document.getElementById("lobby-id-input");

joinBtn.addEventListener("mousedown", () => {
  ws.send(JSON.stringify({
    type: "JOIN_LOBBY",
    text: idInput.value
  }));
  ws.onmessage = event => {
    const json = JSON.parse(event.data);
    console.log(json);

    switch (json.msgType) {
      case "ERROR":
        alert(json.text);
        return;
      case "LOBBY":
        sessionStorage.setItem("lobbyId", idInput.value);
        document.getElementById("lobby-id").textContent = json.lobbyId;

        replacePlayers(
          document.getElementById("lobby-players-list"),
          json.players
        );

        document.getElementById("lobby-id-input-div").classList.add("hidden");
        break;
      case "HTML":
        document.getElementById("view").innerHTML = json.text;
        mp(ws);
    }
  }
});