class GameAudio {
	constructor() {
		this.swimming = new Audio('../assets/audios/Swimming.mp3');
		this.theme = new Audio('../assets/audios/Theme.mp3');
		this.return = new Audio('../assets/audios/Return.mp3');
		this.win = new Audio('../assets/audios/Win.wav');

		this.theme.loop = true;
	}
}

export default GameAudio;
