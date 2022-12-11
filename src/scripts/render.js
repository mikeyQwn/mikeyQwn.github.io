import { editModeCheckbox } from "./components/editModeCheckbox.js";
import { instrumentSelector } from "./components/instrumentsSelector.js";
import { nameSection } from "./components/nameSection.js";
import { playButton } from "./components/playButton.js";
import { tabulatureSection } from "./components/tabulatureSection.js";
import { toggleIsMidiButton } from "./components/toggleIsMidiButton.js";
import { tuninigElement } from "./components/tuningElement.js";

export function renderSong(song) {
    const elements = [
        instrumentSelector,
        tuninigElement,
        nameSection,
        tabulatureSection,
        playButton,
        toggleIsMidiButton,
        editModeCheckbox
    ];
    elements.forEach((element) => element.setSong(song));
    elements.forEach((element) => element.render());
}
