import { instrumentSelector } from "./components/instrumentsSelector.js";
import { nameSection } from "./components/nameSection.js";
import { tabulatureSection } from "./components/tabulatureSection.js";
import { toggleIsMidiButton } from "./components/toggleIsMidiButton.js";
import { tuninigElement } from "./components/tuningElement.js";
import { PlayButton } from "./playButton.js";

export function renderPlayButton(song) {
    const playButton = new PlayButton(song);
    document.body.appendChild(playButton.getElement());
}

export function renderSong(song) {
    instrumentSelector.renderInstrumentSelector();
    tuninigElement.renderTuning(song.getTabulatureObject().getTuning());
    nameSection.updateName(song.getName());
    tabulatureSection.updateTabulature(
        song.getTabulatureObject().getTabulature(),
        2,
        8
    );
    renderPlayButton(song);
    toggleIsMidiButton.renderToggleIsMidiButton(song);
}
