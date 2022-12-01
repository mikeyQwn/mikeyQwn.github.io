import { renderSong } from "./render.js";
import { loadSong } from "./utils/loader.js";

async function main() {
    const song = await loadSong(
        "./src/assets/songs/MCR-ThankYou-For-The-Venom.json"
    );
    renderSong(song);
}
main();
