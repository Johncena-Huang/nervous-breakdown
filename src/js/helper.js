import flipAudio from "../assets/audio/Audio_flip.wav";
import matchAudio from "../assets/audio/Audio_match.wav";
import victoryAudio from "../assets/audio/Audio_victory.wav";
// Shuffle the cards
export const getRandomNumberArray = function (count) {
  const number = Array.from({ length: count }, (_, index) => index + 1); // [1~52]
  for (let index = number.length - 1; index > 0; index--) {
    let randomIndex = Math.floor(Math.random() * (index + 1));
    [number[index], number[randomIndex]] = [number[randomIndex], number[index]];
  }
  return number;
};
// Audio player for the sound effect
class AudioPlayer {
  constructor() {
    this.flipSound = new Audio(flipAudio);
    this.matchSound = new Audio(matchAudio);
    this.victorySound = new Audio(victoryAudio);
  }
  flip() {
    this.flipSound.play();
  }
  match() {
    this.matchSound.play();
  }
  victory() {
    this.flipSound.play();
  }
}

export default new AudioPlayer();
