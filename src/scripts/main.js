import {
    renderInstruments,
    renderTuning,
    renderVisual,
    updateName
} from "./render.js";
import { loadSong } from "./utils/loader.js";

renderInstruments();

async function main() {
    const song = await loadSong(
        "./src/assets/songs/MCR-ThankYou-For-The-Venom.json"
    );
    console.log(song);
    const { name, tempo, timeSignature, tuning, tabulature } = song;
    console.log(name, tabulature);
    renderTuning(tuning);
    updateName(name);
    renderVisual(tabulature, 2, 8);
}
main();
