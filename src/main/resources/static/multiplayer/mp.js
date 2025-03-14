import BoardDrawer from "../utils/BoardDrawer.js";
import KeyQueue from "../utils/KeyQueue.js";
import downscaleBoard from "./downscaleBoard.js";

const mp = (ws) => {
  const INPUT_KEYS = ['w', 'a', 's', 'd'];
  const drawers = {};
  const keyQueue = new KeyQueue(ws);

  const otherBoards = document.getElementsByClassName("other-board");
  const otherBoardsWithoutDrawers = [];
  for (let i = 0; i < otherBoards.length; i++) {
    otherBoardsWithoutDrawers[i] = otherBoards.item(i);
  }

  ws.onmessage = event => {
    console.log("OtherBoardsWithoutDrawers", otherBoardsWithoutDrawers);
    const json = JSON.parse(event.data);
    console.log(json);

    if (json.msgType !== "GAMESTATE") {
      return;
    }

    console.log("drawers", drawers);
    let drawer = drawers[json.game.sessionId];

    if (drawer === undefined) {
      console.log("Drawer is undefined");
      if (json.isMain) {
        drawers[json.game.sessionId] = new BoardDrawer(
          document.getElementById("main-board").getContext("2d"),
          600, 600, 20
        );
      } else {
        console.log(otherBoardsWithoutDrawers[0]);
        drawers[json.game.sessionId] = new BoardDrawer(
          otherBoardsWithoutDrawers[0].getContext("2d"),
          300, 300, 10
        );
        otherBoardsWithoutDrawers.shift();
      }

      drawer = drawers[json.game.sessionId];
      console.log("Drawers after addition", drawers);
    }

    const board = json.isMain ? json.game.board : downscaleBoard(json.game.board, 2);

    drawer.draw(board);
  }

  window.addEventListener("keydown", event => {
    if (INPUT_KEYS.includes(event.key)) {
      keyQueue.push(event.key);
    }
  });
}


export default mp;