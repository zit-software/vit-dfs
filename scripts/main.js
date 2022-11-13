import Maze from './maze.js';
import GameGui from './game-gui.js';
import mazeGenerator from './maze-generator.js';

const { map, start, target, rows, cols } = mazeGenerator();

const maze = new Maze(map, start, target);

const gameGui = new GameGui(document.getElementById('maze-game'), maze, {
	cellSize:
		Math.min(
			document.body.offsetHeight / cols,
			document.body.offsetWidth / rows,
		) - 5,
	delay: 500,
});

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

	const { map, start, target, rows, cols } = mazeGenerator(width, height);
	const maze = new Maze(map, start, target);

	gameGui.init(document.getElementById('maze-game'), maze, {
		cellSize:
			Math.min(
				document.body.offsetHeight / cols,
				document.body.offsetWidth / rows,
			) - 5,
		delay: delay,
	});
}

acceptButton.addEventListener('click', handleAccept);

document
	.getElementById('maze-play')
	.addEventListener('click', gameGui.play.bind(gameGui));
