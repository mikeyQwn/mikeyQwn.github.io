import { playNote } from "./synthesizer.js";
import { getNoteFrequency } from "./utils/noteString.js";

export class Song {
    constructor(name, tempo, timeSignature, tabulature) {
        this.name = name;
        this.tempo = tempo;
        this.timeSignature = timeSignature;
        this.tabulature = tabulature;
    }

    calculateSong() {
        const genericNotes = [];
        this.tabulature
            .getArrayOfGenericNotes()
            .forEach((note) => genericNotes.push(note));
        return genericNotes;
    }

    playSong() {
        console.log("Hey!");
        console.log(this.tabulature);
        const calculatedSong = this.calculateSong();
        calculatedSong.forEach((genericNote, i) =>
            setTimeout(
                () => playNote(getNoteFrequency(genericNote.note), "sine"),
                250 * i
            )
        );
    }
}

export class GenericNote {
    constructor(note, measure, beat) {
        this.note = note;
        this.measure = measure;
        this.beat = beat;
    }
}
