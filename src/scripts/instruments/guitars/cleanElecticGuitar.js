import { generateGuitarKeyMap } from "./guitar.js";

const assetsFolder = "./src/assets/instruments/electric_guitar_clean-mp3";

export class CleanElecticGuitar {
    static name = "Clean Electric Guitar";

    constructor(tuning) {
        this.keyMap = generateGuitarKeyMap(tuning);
    }
    getAudio(note) {
        return new Audio(`${assetsFolder}/notes${note}.mp3`);
    }

    static getIcon() {
        const image = document.createElement("img");
        image.src =
            "./src/assets/instruments/electric_guitar_clean-mp3/icon.svg";
        image.style.objectFit = "contain";
        image.style.width = "100%";
        return image;
    }
}
