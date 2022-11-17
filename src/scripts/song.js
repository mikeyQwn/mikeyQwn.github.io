import { playNote } from "./synthesizer.js";

export class Song {
    constructor(name, tempo, timeSignature, tuning, tabulature) {
        this.name = name;
        this.tempo = tempo;
        this.timeSignature = timeSignature;
        this.tuning = tuning;
        this.tabulature = tabulature;
    }
}

export function playSong(song) {
    for (const note in song) {
    }
}

export function calculateSong(tab) {
    const song = new Array(tab.length);
    for (const note of tab) {
    }
    return song;
}
