import { instrumentSelector } from "./components/instrumentsSelector.js";
import { nameSection } from "./components/nameSection.js";
import { tabulatureSection } from "./components/tabulatureSection.js";
import { toggleIsMidiButton } from "./components/toggleIsMidiButton.js";
import { tuninigElement } from "./components/tuningElement.js";
import { playButton } from "./components/playButton.js";

export function renderPlayButton(song) {
    const playButton = new PlayButton(song);
    document.body.appendChild(playButton.getElement());
}

export function renderSong(song) {
    const elements = [
        instrumentSelector,
        tuninigElement,
        nameSection,
        tabulatureSection,
        playButton,
        toggleIsMidiButton
    ];
    elements.forEach((element) => element.setSong(song));
    elements.forEach((element) => element.render());
    // instrumentSelector.renderInstrumentSelector();
    // instrumentSelector.setSong("Hey");
}
