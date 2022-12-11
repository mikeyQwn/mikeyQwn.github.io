import { createUnselectableImg } from "../utils/createUnselectableImage.js";

const [buttonPlayImg, buttonPauseImg] = createUnselectableImg(
    "./src/assets/svg/buttonPlay.svg",
    "./src/assets/svg/buttonPause.svg"
);

export const playButton = {
    isPlaying: false,
    song: null,
    setSong: (song) => {
        playButton.song = song;
    },
    playImg: buttonPlayImg.cloneNode(),
    pauseImg: buttonPauseImg.cloneNode(),
    element: document.createElement("button"),
    render: () => {
        playButton.element.classList.add("play-button");
        playButton.element.appendChild(playButton.playImg);
        document.body.appendChild(playButton.element);
        playButton.handleOnclick();
        playButton.song.initAudioManager();
    },

    handleOnclick() {
        playButton.element.onclick = () => {
            playButton.song.getAudioManager().togglePause();
            playButton.toggleIsPlaying();
        };
    },

    toggleIsPlaying() {
        playButton.isPlaying = !playButton.isPlaying;
        playButton.element.innerHTML = "";
        if (playButton.isPlaying)
            playButton.element.appendChild(playButton.pauseImg);
        else playButton.element.appendChild(playButton.playImg);
    },

    getElement() {
        return playButton.element;
    }
};
