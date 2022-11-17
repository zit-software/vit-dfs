import Maze from "./maze.js";
import GameAudio from "./game-audio.js";
import { Chart } from "chart.js/auto";

class GameGui {
  constructor(element, maze = new Maze(), { cellSize, delay } = {}) {
    this.audio = new GameAudio();
    this.element = element;
    this.init(maze, { cellSize, delay });
  }

  init(maze = new Maze(), { cellSize = 50, delay = 500 } = {}) {
    try {
      this.audio.theme.play();
    } catch (error) {}
    clearInterval(this.interval);
    // Init values
    this.cellSize = cellSize;
    this.maze = maze;
    this.current = maze.start;
    this.delay = delay;

    // Render flag
    this.element.innerHTML = "";
    this.element.innerHTML += /*html*/ `<div class="maze-flag" style="width: ${
      this.cellSize
    }px; height: ${this.cellSize}px; top: ${
      this.cellSize * this.maze.target[0]
    }px; left: ${this.cellSize * this.maze.target[1]}px"></div>`;

    // Render map
    for (const row of this.maze.map) {
      const rowEl = document.createElement("div");
      rowEl.classList.add("maze-row");

      for (const cell of row) {
        rowEl.innerHTML += /*html*/ `<div class="maze-cell${
          cell ? " maze-grass" : ""
        }" style="width: ${this.cellSize}px; height: ${
          this.cellSize
        }px;"></div>`;
      }

      this.element.append(rowEl);
    }

    // Render character
    this.character = document.createElement("div");
    this.character.classList.add("maze-character");
    this.character.style.width = this.cellSize + "px";
    this.character.style.height = this.cellSize + "px";
    this.element.append(this.character);
    this.render();

    // Recreate chart
    this.chart?.destroy();
    this.chart = new Chart(document.getElementById("maze-chart"), {
      type: "bar",
      data: {
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ["#00c7c0", "#ff3084"],
          },
        ],
        labels: ["Độ dài đường đi", "Số bước đi sai"],
      },
      options: {
        animation: {
          y: { duration: 0 },
        },

        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },

        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  render() {
    this.character.style.top = this.cellSize * this.current[0] + "px";
    this.character.style.left = this.cellSize * this.current[1] + "px";
  }

  goto(next) {
    this.current = next;
    this.render();
  }

  drawRect(rect = [], className = "maze-current") {
    const row = this.element.querySelectorAll(".maze-row")[rect[0]];
    const cell = row.querySelectorAll(".maze-cell")[rect[1]];

    cell.classList.add(className);
  }

  drawRects(rects = [], className) {
    rects.forEach((rect) => this.drawRect(rect, className));
  }

  play() {
    this.init(this.maze, { cellSize: this.cellSize, delay: this.delay });
    this.audio.theme.pause();
    clearInterval(this.interval);
    this.drawRect(this.current);
    this.maze.startDfs();
    const steps = this.maze.steps;
    const path = this.maze.path;
    let len = 0;
    let error = 0;

    this.interval = setInterval(() => {
      const step = steps.shift();

      if (!step) {
        this.audio.win.play();
        clearInterval(this.interval);

        this.interval = setInterval(() => {
          const p = path.pop();
          if (!p) return clearInterval(this.interval);

          this.drawRect(p, "maze-success");
        }, this.delay / 10);

        return;
      }

      if (!step.pops?.length) {
        len++;
        this.audio.swimming.play();
      } else {
        len--;
        error++;
        this.audio.return.play();
      }

      this.goto(step.current);

      this.drawRect(step.current);

      this.drawRects(step.nextStates, "maze-next");

      this.drawRects(step.pops, "maze-pop");

      document.getElementById(
        "maze-current-pos"
      ).innerHTML = `(${step.current.join(", ")})`;

      this.chart.data.datasets[0].data.pop();
      this.chart.data.datasets[0].data.pop();
      this.chart.data.datasets[0].data.push(len, error);

      this.chart.update();
    }, this.delay);
  }
}

export default GameGui;
