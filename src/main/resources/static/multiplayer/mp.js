import BoardDrawer from "../utils/BoardDrawer.js";
import KeyQueue from "../utils/KeyQueue.js";

const mp = (ws) => {
  const INPUT_KEYS = ['w', 'a', 's', 'd'];
  let mainDrawer = null;
  let otherDrawers = null;
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

    // Populate other boards

    const otherGames = mpGameState.otherGames;

    if (otherDrawers === null) {
      otherDrawers = {};
      const boards = document.getElementsByClassName("other-board");
      for (let i = 0; i < otherGames.length; i++) {
        otherDrawers[otherGames[i].sessionId] = new BoardDrawer(
          boards[i].getContext("2d"), 300, 300, 10
        );
      }
    }

    for (let i = 0; i < otherGames.length; i++) {
      const board = otherGames[i].board;
      board.sanke.x /= 2;
      board.sanke.y /= 2;
      const parts = board.sanke.parts;
      for (let i = 0; i < parts.length; i++) {
        parts[i].x /= 2;
        parts[i].y /= 2;
      }
      board.food.x /= 2;
      board.food.y /= 2;

      otherDrawers[otherGames[i].sessionId].draw(board);
    }
  }

  window.addEventListener("keydown", event => {
    if (INPUT_KEYS.includes(event.key)) {
      keyQueue.push(event.key);
    }
  });
}


export default mp;