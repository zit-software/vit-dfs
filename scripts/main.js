import Maze from './maze.js';
import GameGui from './game-gui.js';
import mazeGenerator from './maze-generator.js';

const gameGui = new GameGui(document.getElementById('maze-game'));

function gameGenerate(width, height, delay) {
	const { map, start, target, rows, cols } = mazeGenerator(width, height);
	const maze = new Maze(map, start, target);

	gameGui.init(maze, {
		cellSize: Math.min(
			(document.body.offsetHeight - 80) / cols,
			(document.body.offsetWidth - 80) / rows,
		),
		delay,
	});
}

const acceptButton = document.getElementById('maze-accept');

function handleAccept() {
	const width = Number(
		document.getElementById('maze-width').nextElementSibling.value,
	);
	const height = Number(
		document.getElementById('maze-height').nextElementSibling.value,
	);

	const delay = Number(
		document.getElementById('maze-delay').nextElementSibling.value,
	);

	gameGenerate(width, height, delay);
}

acceptButton.addEventListener('click', handleAccept);

document
	.getElementById('maze-play')
	.addEventListener('click', gameGui.play.bind(gameGui));

document.getElementById('maze-login-play-btn').addEventListener('click', () => {
	document.getElementById('maze-login').classList.add('hide');
	handleAccept();
});
