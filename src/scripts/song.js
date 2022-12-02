import { playNote } from "./synthesizer.js";
import { getNoteFrequency } from "./utils/noteString.js";

export class Song {
    constructor(name, tempo, timeSignature, tabulature) {
        this.name = name;
        this.tempo = tempo;
        this.timeSignature = timeSignature;
        this.tabulature = tabulature;
        this.beatsInMeasure = parseInt(timeSignature.split("/")[0]);
        this.beatLength = 60 / this.tempo / (this.beatsInMeasure === 8 ? 2 : 1);
    }

    getNoteTimeInSeconds(beat, measure) {
        return (
            ((measure - 1) * this.beatsInMeasure + (beat - 1)) * this.beatLength
        );
    }

    getBeatAndMeasureFromTime(time) {
        const beat = time / this.beatLength;
        return {
            beat: (beat % this.beatsInMeasure) + 1,
            measure: Math.floor(beat / this.beatsInMeasure) + 1
        };
    }

    getSongLength() {
        return this.tabulature
            .getArrayOfGenericNotes()
            .reduce((previous, current) => {
                return Math.max(
                    previous,
                    this.getNoteTimeInSeconds(current.beat, current.measure)
                );
            }, 0);
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
        console.log({ len: this.getSongLength() });
        const calculatedSong = this.calculateSong();
        calculatedSong.forEach((genericNote) =>
            playNote(
                context,
                this.getNoteTimeInSeconds(
                    genericNote.beat,
                    genericNote.measure
                ),
                getNoteFrequency(genericNote.note),
                "sine",
                this.beatLength
            )
        );
    }

    restartSong(button) {
        button.context = new AudioContext();
        this.playSong(button.context);
        button.context.suspend();
    }

    handlePlayButton(button) {
        button.isPlaying = false;
        this.restartSong(button);
        button.onclick = () => {
            if (!button.isPlaying) {
                button.context.resume();
            }
            if (button.isPlaying) {
                button.context.suspend();
            }
            if (button.context.currentTime > this.getSongLength()) {
                this.restartSong(button);
                button.isPlaying = true;
            }
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
