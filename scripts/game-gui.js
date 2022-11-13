import Maze from './maze.js';

class GameGui {
	constructor(element, maze = new Maze(), { cellSize, delay } = {}) {
		this.init(element, maze, { cellSize, delay });
	}

	init(element, maze = new Maze(), { cellSize = 50, delay = 500 } = {}) {
		clearInterval(this.interval);
		// Init values
		this.element = element;
		this.cellSize = cellSize;
		this.maze = maze;
		this.current = maze.start;
		this.delay = delay;

		// Render flag
		this.element.innerHTML = '';
		this.element.innerHTML += /*html*/ `<div class="maze-flag" style="width: ${
			this.cellSize
		}px; height: ${this.cellSize}px; top: ${
			this.cellSize * this.maze.target[0]
		}px; left: ${this.cellSize * this.maze.target[1]}px"></div>`;

		// Render map
		for (const row of this.maze.map) {
			const rowEl = document.createElement('div');
			rowEl.classList.add('maze-row');

			for (const cell of row) {
				rowEl.innerHTML += /*html*/ `<div class="maze-cell${
					cell ? ' maze-grass' : ''
				}" style="width: ${this.cellSize}px; height: ${
					this.cellSize
				}px;"></div>`;
			}

			this.element.append(rowEl);
		}

		// Render character
		this.character = document.createElement('div');
		this.character.classList.add('maze-character');
		this.character.style.width = this.cellSize + 'px';
		this.character.style.height = this.cellSize + 'px';
		this.element.append(this.character);
		this.render();
	}

	render() {
		this.character.style.top = this.cellSize * this.current[0] + 'px';
		this.character.style.left = this.cellSize * this.current[1] + 'px';
	}

	goto(next) {
		this.current = next;
		this.render();
	}

	drawRect(rect = [], className = 'maze-next') {
		const row = this.element.querySelectorAll('.maze-row')[rect[0]];
		const cell = row.querySelectorAll('.maze-cell')[rect[1]];

		cell.classList.add(className);
	}

	drawRects(rects = [], className) {
		rects.forEach((rect) => this.drawRect(rect, className));
	}

	play() {
		clearInterval(this.interval);
		this.drawRect(this.current);
		this.maze.startDfs();
		const steps = this.maze.steps;

		this.interval = setInterval(() => {
			const step = steps.shift();

			if (!step) return clearInterval(this.interval);

			this.goto(step.current);

			this.drawRects(step.nextStates, 'maze-next');
			this.drawRects(step.pops, 'maze-pop');
		}, this.delay);
	}
}

export default GameGui;

