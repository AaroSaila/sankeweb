import BoardDrawer from "../utils/BoardDrawer.js";
import KeyQueue from "../utils/KeyQueue.js";
import downscaleBoard from "./downscaleBoard.js";

const mp = (ws) => {
  const INPUT_KEYS = ['w', 'a', 's', 'd'];
  const drawers = {};
  const mainSpeed = document.getElementById("main-speed");
  const mainScore = document.getElementById("main-score");
  const otherScores = {};
  const keyQueue = new KeyQueue(ws);

  const otherGames = document.getElementsByClassName("other-game");
  const otherGamesWithoutPlayers = [];
  for (let i = 0; i < otherGames.length; i++) {
    otherGamesWithoutPlayers[i] = otherGames.item(i);
  }

  ws.onmessage = event => {
    const json = JSON.parse(event.data);

    if (json.msgType !== "GAMESTATE") {
      return;
    }

    let drawer = drawers[json.game.sessionId];

    if (drawer === undefined) {
      if (json.isMain) {
        drawers[json.game.sessionId] = new BoardDrawer(
          document.getElementById("main-board").getContext("2d"),
          600, 600, 20
        );
      } else {
        const otherGame = otherGamesWithoutPlayers[0];
        otherGame.id = json.game.sessionId;

        // Init board
        const ctx = otherGame.children.item(2).getContext("2d");
        drawers[json.game.sessionId] = new BoardDrawer(
          ctx, 300, 300, 10
        );

        // Set name
        otherGame.children.item(0).children.item(0)
          .innerText = json.game.sessionId;

        // Init score
        otherScores[json.game.sessionId] = otherGame.children.item(1).children.item(0);

        otherGamesWithoutPlayers.shift();
      }

      drawer = drawers[json.game.sessionId];
    }

    let board;
    if (json.isMain) {
      board = json.game.board;
      mainScore.innerText = json.game.score;
      mainSpeed.innerText = json.game.tickRate;
    } else {
      board = downscaleBoard(json.game.board, 2);
      otherScores[json.game.sessionId].innerText = json.game.score;
    }

    drawer.draw(board);
  }

  window.addEventListener("keydown", event => {
    if (INPUT_KEYS.includes(event.key)) {
      keyQueue.push(event.key);
    }

    keyQueue.emptyQueue();
  });
}


export default mp;