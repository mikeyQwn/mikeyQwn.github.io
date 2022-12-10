import { CleanElecticGuitar } from "../instruments/guitars/cleanElecticGuitar.js";

const instruments = [CleanElecticGuitar];
const instrumentSection = document.getElementById(
    "bottom-navbar-buttons-container"
);

export const instrumentSelector = {
    selectedInstrument: CleanElecticGuitar,
    song: null,
    setSong: (song) => {
        instrumentSelector.song = song;
    },

    render: () => {
        for (const instrument of instruments) {
            const button = document.createElement("button");
            button.classList.add("instrument-button");
            button.appendChild(instrument.getIcon());

            instrumentSection.appendChild(button);
        }
    }
};
