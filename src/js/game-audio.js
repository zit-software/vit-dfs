import swimming from "../assets/audios/Swimming.mp3";
import theme from "../assets/audios/Theme.mp3";
import _return from "../assets/audios/Return.mp3";
import win from "../assets/audios/Win.wav";
import click from "../assets/audios/Click.wav";

class GameAudio {
  constructor() {
    this.swimming = new Audio(swimming);
    this.theme = new Audio(theme);
    this.return = new Audio(_return);
    this.win = new Audio(win);
    this.click = new Audio(click);

    this.theme.loop = true;
  }
}

export default GameAudio;
