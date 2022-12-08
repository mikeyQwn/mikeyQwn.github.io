import { CleanElecticGuitar } from "./instruments/guitars/cleanElecticGuitar.js";
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
        this.audioManager;
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

    initAudioManager(instrument) {
        const calculatedSong = this.calculateSong();
        const audioManagerArray = calculatedSong.map((genericNote) => {
            const { beat, measure, note, element } = genericNote;
            const audio = instrument.getAudio(note);
            return {
                time: this.getNoteTimeInSeconds(beat, measure),
                frequency: getNoteFrequency(note),
                audio,
                element
            };
        });
        this.audioManager = new AudioManager(
            audioManagerArray.values(),
            instrument,
            this.getSongLength(),
            this.beatLength,
            this
        );
        // calculatedSong.forEach((genericNote) =>
        //     playNote(
        //         context,
        //         this.getNoteTimeInSeconds(
        //             genericNote.beat,
        //             genericNote.measure
        //         ),
        //         getNoteFrequency(genericNote.note),
        //         "sine",
        //         this.beatLength
        //     )
        // );
    }
    getAudioManager() {
        return this.audioManager;
    }
}

class AudioManager {
    constructor(currentNoteIter, instrument, songLength, beatLength, song) {
        this.context = new AudioContext();
        this.context.suspend();
        this.currentNoteIter = currentNoteIter;
        this.currentNoteValue = this.currentNoteIter.next().value;
        this.previousNoteValueArr = [this.currentNoteIter.value];
        this.isPaused = true;
        this.isMidi = true;
        this.instrument = instrument;
        this.songLength = songLength + 1;
        this.beatLength = beatLength;
        this.song = song;
    }
    play() {
        this.context.resume();
        window.requestAnimationFrame(this.playLoop.bind(this));
    }

    pause() {
        this.context.suspend();
        this.isPaused = true;
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        if (!this.isPaused) {
            this.play();
        } else {
            this.pause();
        }
    }

    toggleIsMidi() {
        this.isMidi = !this.isMidi;
    }

    playLoop() {
        if (this.isPaused) return;
        if (this.songLength < this.context.currentTime) {
            this.restart();
            return;
        }
        if (!this.currentNoteValue) return;

        let cycle = 0;
        while (this.currentNoteValue.time < this.context.currentTime) {
            if (!this.isMidi) {
                this.currentNoteValue.audio.play();
            } else {
                playNote(
                    this.context,
                    0,
                    this.currentNoteValue.frequency,
                    "sawtooth",
                    this.beatLength
                );
            }
            if (this.previousNoteValueArr)
                this.previousNoteValueArr.forEach((item) => {
                    if (item) item.element.classList.remove("selected-note");
                });
            if (cycle < 1) {
                this.previousNoteValueArr = [this.currentNoteValue];
            } else {
                this.previousNoteValueArr.push(this.currentNoteValue);
            }
            this.currentNoteValue = this.currentNoteIter.next().value;
            if (this.previousNoteValueArr)
                this.previousNoteValueArr.forEach((item) => {
                    if (item) item.element.classList.add("selected-note");
                });
            if (!this.currentNoteValue) {
                setTimeout(this.restart.bind(this), 1000);
                return;
            }

            ++cycle;
        }
        cycle = 0;
        window.requestAnimationFrame(this.playLoop.bind(this));
    }
    start;
    restart() {
        this.previousNoteValueArr.forEach((item) => {
            if (item) item.element.classList.remove("selected-note");
        });
        this.song.initAudioManager(CleanElecticGuitar);
    }
}

export class GenericNote {
    constructor(note, measure, beat, element) {
        this.note = note;
        this.measure = measure;
        this.beat = beat;
        this.element = element;
    }
}
