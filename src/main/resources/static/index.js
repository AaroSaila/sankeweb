const mpStartButton = document.getElementById("mp-button");

mpStartButton.addEventListener("click", () => {
  const createLobbyA = document.createElement("a");
  const joinLobbyA = document.createElement("a");

  createLobbyA.textContent = "Create Lobby";
  joinLobbyA.textContent = "Join Lobby";

  createLobbyA.classList.add("button-link");
  joinLobbyA.classList.add("button-link");

  createLobbyA.href = "./multiplayer/mp.html";

  createLobbyA.addEventListener("click", () => {
    sessionStorage.setItem("lobby", "create");
  })

  document.body.appendChild(createLobbyA);
  document.body.appendChild(joinLobbyA);
});