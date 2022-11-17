import { guitarTabSymbol, GuitarTab } from "./instruments/guitars/guitarTab.js";
import { loadSong } from "./utils/loader.js";
import { renderInstruments, renderVisual } from "./render.js";

renderInstruments();

async function main() {
    const song = await loadSong(
        "./src/assets/songs/MCR-ThankYou-For-The-Venom.json"
    );
    console.log(song);
}
main();
