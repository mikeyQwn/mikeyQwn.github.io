import { CleanElecticGuitar } from "./instruments/guitars/cleanElecticGuitar.js";
import { createUnselectableImg } from "./utils/createUnselectableImage.js";

const [buttonPlayImg, buttonPauseImg] = createUnselectableImg(
    "./src/assets/svg/buttonPlay.svg",
    "./src/assets/svg/buttonPause.svg"
);

export class PlayButton {
    isPlaying = false;
    constructor(song) {
        this.playImg = buttonPlayImg.cloneNode();
        this.pauseImg = buttonPauseImg.cloneNode();
        this.song = song;
        this.element = document.createElement("button");
        this.element.classList.add("play-button");
        this.element.appendChild(this.playImg);
        this.restartSong();
        this.handleOnclick();
    }

    restartSong() {
        this.song.initAudioManager(CleanElecticGuitar);
    }

    handleOnclick() {
        this.element.onclick = () => {
            this.song.getAudioManager().togglePause();
            this.toggleIsPlaying();
        };
    }

    toggleIsPlaying() {
        this.isPlaying = !this.isPlaying;
        this.element.innerHTML = "";
        if (this.isPlaying) this.element.appendChild(this.pauseImg);
        else this.element.appendChild(this.playImg);
    }

    getElement() {
        return this.element;
    }
}
