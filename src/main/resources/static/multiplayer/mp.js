import BoardDrawer from "../utils/BoardDrawer.js";
import KeyQueue from "../utils/KeyQueue.js";

const mp = (ws) => {
  const INPUT_KEYS = ['w', 'a', 's', 'd'];
  let mainDrawer = null;
  const keyQueue = new KeyQueue(ws);

  ws.send(JSON.stringify({
    type: "MP_START",
    text: sessionStorage.getItem("lobbyId")
  }));

  ws.onmessage = event => {
    const mpGameState = JSON.parse(event.data);

    if (mpGameState.msgType !== "GAMESTATE") {
      return;
    }

    const otherGames = mpGameState.otherGames;

    // Populate main game

    const mainGame = mpGameState.mainGame;

    document.getElementById("main-score").textContent = mainGame.score;
    document.getElementById("main-speed").textContent = mainGame.tickRate;

    if (mainDrawer === null) {
      mainDrawer = new BoardDrawer(
        document.getElementById("main-board").getContext("2d"),
        600,
        600,
        20
      );
    }

    mainDrawer.draw(mainGame.board);
  }

  window.addEventListener("keydown", event => {
    if (INPUT_KEYS.includes(event.key)) {
      keyQueue.push(event.key);
    }
  });
}


export default mp;