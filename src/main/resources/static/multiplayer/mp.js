import ENV from "../env.js";

const create = sessionStorage.getItem("lobby") === "create";

const lobbyIdSpan = document.getElementById("lobby-id");
const playersDiv = document.getElementById("lobby-players");

const ws = new WebSocket(`ws://${ENV.host}/sp`);
ws.onopen = () => {
  if (create) {
    ws.send(JSON.stringify({
      type: "CREATE_LOBBY",
      text: ""
    }));

    ws.onmessage = event => {
      const json = JSON.parse(event.data);
      console.log(json);

      if (json.msgType === "CREATE_LOBBY") {
        console.log("asdasd");
        const lobbyId = json.lobbyId;
        const sessionId = json.sessionId;

        lobbyIdSpan.textContent = lobbyId;

        const playersList = document.createElement("ul");
        playersList.id = "lobby-players-list";
        const playerLi = document.createElement("li");
        playerLi.textContent = sessionId;
        playersList.appendChild(playerLi);
        playersDiv.appendChild(playersList);
      }
    }
  }
}


