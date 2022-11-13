class Maze {
	constructor(
		map = [[]],
		start = [0, 0],
		target = [map.length - 1, map[0].length - 1],
	) {
		this.map = map;
		this.start = start;
		this.target = target;
		this.hashed = {};
		this.steps = [];
		this.path = [];
	}

	isGoal(state = []) {
		return state[0] === this.target[0] && state[1] === this.target[1];
	}

	findNextStates(current) {
		const result = [];

		// To up
		if (current[0] && !this.map[current[0] - 1][current[1]]) {
			result.push([current[0] - 1, current[1]]);
		}

		// To down
		if (
			current[0] != this.map.length - 1 &&
			!this.map[current[0] + 1][current[1]]
		) {
			result.push([current[0] + 1, current[1]]);
		}

		// To left
		if (current[1] && !this.map[current[0]][current[1] - 1]) {
			result.push([current[0], current[1] - 1]);
		}

		// To right
		if (
			current[1] != this.map[0]?.length - 1 &&
			!this.map[current[0]][current[1] + 1]
		) {
			result.push([current[0], current[1] + 1]);
		}

		return result;
	}

	dfs(current = this.start) {
		this.path.push(current);

		if (this.isGoal(current)) {
			this.steps.push({ current, nextStates: [] });
			return true;
		}

		if (!this.hashed[current[0]]) this.hashed[current[0]] = {};

		this.hashed[current[0]][current[1]] = true;

		const nextStates = this.findNextStates(current);

		const currentStep = {
			current,
			nextStates: [],
			pops: [],
		};
		this.steps.push(currentStep);

		for (const nextState of nextStates) {
			if (this.hashed[nextState[0]])
				if (this.hashed[nextState[0]][nextState[1]]) continue;

			currentStep.nextStates.push(nextState);

			if (this.dfs(nextState)) return true;
		}

		this.steps.push({ current, nextStates: [], pops: [current] });

		this.path.pop();

		return false;
	}
}

export default Maze;

