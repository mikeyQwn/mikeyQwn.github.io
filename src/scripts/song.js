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

    playSong(context) {
        console.log(this.tabulature);
        const calculatedSong = this.calculateSong();
        calculatedSong.forEach((genericNote, i) =>
            playNote(context, i / 8, getNoteFrequency(genericNote.note), "sine")
        );
    }

    handlePlayButton(button) {
        button.isPlaying = false;
        button.context = new AudioContext();
        this.playSong(button.context);
        button.context.suspend();
        button.onclick = () => {
            if (!button.isPlaying) {
                button.context.resume();
            }
            if (button.isPlaying) button.context.suspend();
            button.isPlaying = !button.isPlaying;
            button.innerText = button.isPlaying ? "Pause" : "Play";
        };
    }
}

export class GenericNote {
    constructor(note, measure, beat) {
        this.note = note;
        this.measure = measure;
        this.beat = beat;
    }
}
