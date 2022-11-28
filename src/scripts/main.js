import { renderInstruments } from "./render.js";
import { loadSong } from "./utils/loader.js";

renderInstruments();

async function main() {
    const song = await loadSong(
        "./src/assets/songs/MCR-ThankYou-For-The-Venom.json"
    );
    console.log(song);
}
main();
