import { CleanElecticGuitar } from "../instruments/guitars/cleanElecticGuitar.js";

const instruments = [CleanElecticGuitar];
const instrumentSection = document.getElementById(
    "bottom-navbar-buttons-container"
);

export const instrumentSelector = {
    selectedInstrument: CleanElecticGuitar,
    isRendered: false,
    song: null,
    setSong: (song) => {
        instrumentSelector.song = song;
    },

    render: () => {
        if (instrumentSelector.isRendered) return;
        for (const instrument of instruments) {
            const button = document.createElement("button");
            button.classList.add("instrument-button");
            button.appendChild(instrument.getIcon());

            instrumentSection.appendChild(button);
        }
        instrumentSelector.isRendered = true;
    }
};
