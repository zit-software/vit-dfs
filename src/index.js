import "./css/styles.css";
import GameGui from "./js/game-gui";
import Maze from "./js/maze";
import mazeGenerator from "./js/maze-generator";

window.addEventListener("load", () => {
  const gameGui = new GameGui(document.getElementById("maze-game"));

  function gameGenerate(width, height, delay) {
    const { map, start, target, rows, cols } = mazeGenerator(width, height);
    const maze = new Maze(map, start, target);

    gameGui.init(maze, {
      cellSize: Math.min(
        (document.body.offsetHeight - 80) / cols,
        (document.body.offsetWidth - 80) / rows
      ),
      delay,
    });
  }

  gameGenerate();

  const acceptButton = document.getElementById("maze-accept");

  function handleAccept() {
    const width = Number(document.getElementById("maze-width").value);
    const height = Number(document.getElementById("maze-height").value);

    const delay = Number(document.getElementById("maze-delay").value);

    gameGenerate(width, height, delay);
  }

  acceptButton.addEventListener("click", handleAccept);

  document
    .getElementById("maze-play")
    .addEventListener("click", gameGui.play.bind(gameGui));

  document
    .getElementById("maze-login-play-btn")
    .addEventListener("click", () => {
      gameGui.audio.click.play();
      gameGui.audio.theme.pause();
      setTimeout(() => {
        document.getElementById("maze-login").classList.add("hide");
        handleAccept();
      }, 1000);
    });

  function toggleModal() {
    document.querySelector(".modal").classList.toggle("show");
  }

  window.toggleModal = toggleModal;
});
