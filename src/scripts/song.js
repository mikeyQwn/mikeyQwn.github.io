import { playNote } from "./synthesizer.js";
import { getNoteFrequency } from "./utils/noteString.js";

export class Song {
    constructor(name, tempo, timeSignature, tabulature) {
        this.name = name;
        this.tempo = tempo;
        this.timeSignature = timeSignature;
        this.tabulature = tabulature;
        this.beatsInMeasure = parseInt(timeSignature.split("/")[0]);
    }

    getNoteTimeInSeconds(beat, measure) {
        const beatLength =
            60 / this.tempo / (this.beatsInMeasure === 8 ? 2 : 1);
        return ((measure - 1) * this.beatsInMeasure + (beat - 1)) * beatLength;
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
        calculatedSong.forEach((genericNote) =>
            playNote(
                context,
                this.getNoteTimeInSeconds(
                    genericNote.beat,
                    genericNote.measure
                ),
                getNoteFrequency(genericNote.note),
                "sine"
            )
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
