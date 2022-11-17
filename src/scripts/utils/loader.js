import { Song } from "../song.js";

export async function loadSong(request) {
    const response = await fetch(request);
    const songObj = await response.json();
    return new Song(
        songObj.name,
        songObj.tempo,
        songObj.timeSignature,
        songObj.tuning,
        songObj.tabulature
    );
}
