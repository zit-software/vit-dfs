import MazeBuilder from './maze-builder.js';

export default function mazeGenerator(width = 10, height = 10) {
	const mazeBuilder = new MazeBuilder(height, width);

	let start = null;
	let target = null;

	const map = [];

	for (let i = 0; i < mazeBuilder.maze[0].length; i++) {
		map.push([]);

		for (let j = 0; j < mazeBuilder.maze.length; j++) {
			const len = mazeBuilder.maze[j][i].length;

			if (len === 2) {
				map[i].push(0);

				if (start) target = [i, j];
				else start = [i, j];

				continue;
			}

			map[i].push(len);
		}
	}

	return {
		map,
		start,
		target,
		rows: mazeBuilder.rows,
		cols: mazeBuilder.cols,
	};
}

