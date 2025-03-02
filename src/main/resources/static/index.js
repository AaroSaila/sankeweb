const mpButton = document.getElementById("mp-button");

mpButton.addEventListener("mousedown", () => {
  document.getElementById("lobby-buttons").classList.remove("hidden");
});