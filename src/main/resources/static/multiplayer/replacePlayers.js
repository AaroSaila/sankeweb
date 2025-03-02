const replacePlayers = (node, players) => {
  const playerNodes = [];
  for (let i = 0; i < players.length; i++) {
    const playerNode = document.createElement("li");
    playerNode.textContent = players[i];
    playerNodes.push(playerNode);
  }
  node.replaceChildren(...playerNodes);
}


export default replacePlayers;