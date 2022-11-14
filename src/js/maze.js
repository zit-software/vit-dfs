class Maze {
  constructor(
    map = [[]],
    start = [0, 0],
    target = [map.length - 1, map[0].length - 1]
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

  distance(p1, p2) {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
  }

  findNextStates(current) {
    const result = [];

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

    return result.sort((a, b) => {
      return this.distance(a, this.target) - this.distance(b, this.target);
    });
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

    const next = [];

    for (const nextState of nextStates) {
      if (this.hashed[nextState[0]])
        if (this.hashed[nextState[0]][nextState[1]]) continue;

      currentStep.nextStates.push(nextState);
      next.push(nextState);
    }

    for (const nextState of next) {
      if (this.dfs(nextState)) return true;

      this.steps.push({ current, nextStates: [], pops: [nextState] });
      this.path.pop();
    }

    return false;
  }
  startDfs() {
    this.path = [];
    this.steps = [];
    this.hashed = {};

    return this.dfs();
  }
}

export default Maze;
