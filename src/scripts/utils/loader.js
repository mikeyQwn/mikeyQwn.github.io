import { GuitarTab } from "../instruments/guitars/guitarTab.js";
import { Song } from "../song.js";

export async function loadSong(request) {
    const response = await fetch(request);
    const songObj = await response.json();

    return new Song(
        songObj.name,
        songObj.tempo,
        songObj.timeSignature,
        getTabulatureClass(songObj.instrument, songObj.instrumentSpecificData)
    );
}

const getTabulatureClass = (instrument, instrumentSpecificData) => {
    switch (instrument) {
        case "guitar":
            return new GuitarTab(
                instrumentSpecificData.tabulature,
                instrumentSpecificData.tuning
            );
    }
};

export const loadLocalStorageSong = () => {
    const song = JSON.parse(localStorage.getItem("edited-song"));
    return new Song(
        song.name,
        song.tempo,
        song.timeSignature,
        getTabulatureClass("guitar", song.tabulatureObject)
    );
};
