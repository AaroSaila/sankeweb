const downscaleBoard = (board, amount) => {
  board.sanke.x /= amount;
  board.sanke.y /= amount;
  for (let i = 0; i < board.sanke.parts.length; i++) {
    board.sanke.parts[i].x /= amount;
    board.sanke.parts[i].y /= amount;
  }
  board.food.x /= amount;
  board.food.y /= amount;

  return board;
}


export default downscaleBoard;