import { generateGuitarKeyMap } from "./guitar.js";

const assetsFolder = "../../assets/electric_guitar_clean-mp3/icon.svg";

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
        image.src = "../../assets/electric_guitar_clean-mp3/icon.svg";
        image.style.objectFit = "contain";
        image.style.width = "100%";
        return image;
    }
}
