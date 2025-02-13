import Globals from "../globals.js";

const create = sessionStorage.getItem("lobby") === "create";
const join = sessionStorage.getItem("lobby") === "join";

const lobbyDiv = document.getElementById("lobby-div");
const lobbyIdSpan = document.getElementById("lobby-id");
const playersList = document.getElementById("lobby-players-list");
const idInputdiv = document.getElementById("lobby-id-input-div");
const gameDiv = document.getElementById("game-div");

const populatePlayers = players => {
  let lastPlayerNode = playersList.lastChild;
  while (lastPlayerNode) {
    playersList.removeChild(lastPlayerNode);
    lastPlayerNode = playersList.lastChild;
  }

  for (let i = 0; i < players.length; i++) {
    const playerLi = document.createElement("li");
    playerLi.textContent = players[i];
    playersList.appendChild(playerLi);
  }
};


const ws = new WebSocket(`ws://${Globals.host}/sp`);
ws.onopen = () => {
  if (create) {
    ws.send(JSON.stringify({
      type: "CREATE_LOBBY",
      text: ""
    }));

    ws.onmessage = event => {
      const lobby = JSON.parse(event.data);
      console.log(lobby);

      if (lobby.msgType === "LOBBY") {
        lobbyIdSpan.textContent = lobby.lobbyId;

        populatePlayers(lobby.players);
      }
    }

    const startGameButton = document.createElement("button");
    startGameButton.textContent = "Start";
    lobbyDiv.appendChild(startGameButton);

    startGameButton.addEventListener("click", () => {
      lobbyDiv.classList.add("disabled");
      gameDiv.classList.remove("disabled");
    });

  } else if (join) {
    const labelLabel = document.createElement("label");
    labelLabel.textContent = "Enter lobby ID";
    idInputdiv.appendChild(labelLabel);

    const lobbyIdInput = document.createElement("input");
    lobbyIdInput.id = "lobby-id-input";
    lobbyIdInput.type = "number";
    labelLabel.htmlFor = "lobby-id-input";
    idInputdiv.appendChild(lobbyIdInput);

    const joinButton = document.createElement("button");
    joinButton.textContent = "Join";
    idInputdiv.appendChild(joinButton);

    joinButton.addEventListener("click", () => {
      ws.send(JSON.stringify({
        type: "JOIN_LOBBY",
        text: lobbyIdInput.value
      }));

      ws.onmessage = event => {
        const lobby = JSON.parse(event.data);
        if (lobby.msgType === "ERROR") {
          const errorMsgSpan = document.createElement("span");
          errorMsgSpan.textContent = lobby.text;
          errorMsgSpan.classList.add("error-message");
          idInputdiv.appendChild(errorMsgSpan);
        } else if (lobby.msgType === "LOBBY") {
          lobbyIdSpan.textContent = lobby.lobbyId;
          populatePlayers(lobby.players);
        }
      }
    });
  }
}
