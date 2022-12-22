import { editModeCheckbox } from "./components/editModeCheckbox.js";
import { instrumentSelector } from "./components/instrumentsSelector.js";
import { nameSection } from "./components/nameSection.js";
import { playButton } from "./components/playButton.js";
import { saveSong } from "./components/saveSong.js";
import { songListSection } from "./components/songListSection.js";
import { tabulatureSection } from "./components/tabulatureSection.js";
import { toggleIsMidiButton } from "./components/toggleIsMidiButton.js";
import { tuninigElement } from "./components/tuningElement.js";

export function renderSong(song) {
    const elements = [
        instrumentSelector,
        tuninigElement,
        tabulatureSection,
        nameSection,
        playButton,
        toggleIsMidiButton,
        editModeCheckbox,
        songListSection,
        saveSong
    ];
    elements.forEach((element) => element.setSong(song));
    elements.forEach((element) => element.render());
}
