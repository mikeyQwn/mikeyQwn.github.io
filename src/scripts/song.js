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
    }
    getAudioManager() {
        return this.audioManager;
    }
}

class AudioManager {
    constructor(currentNoteIter, instrument, songLength, beatLength, song) {
        this.context = new AudioContext();
        this.context.suspend();
        this.nextNoteIter = currentNoteIter;
        this.nextNoteValue = this.nextNoteIter.next().value;
        this.currentNotesValuesArr = [this.nextNoteIter.value];
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

    selectCurrentNotes() {
        if (this.currentNotesValuesArr)
            this.currentNotesValuesArr.forEach((item) => {
                if (item) item.element.classList.add("selected-note");
            });
    }

    unselectCurrentNotes() {
        if (this.currentNotesValuesArr)
            this.currentNotesValuesArr.forEach((item) => {
                if (item) item.element.classList.remove("selected-note");
            });
    }

    playLoop() {
        if (this.isPaused) return;
        if (this.songLength < this.context.currentTime) {
            this.restart();
            return;
        }
        if (!this.nextNoteValue) return;

        let cycle = 0;
        while (this.nextNoteValue.time < this.context.currentTime) {
            if (!this.isMidi) {
                this.nextNoteValue.audio.play();
            } else {
                playNote(
                    this.context,
                    this.nextNoteValue.frequency,
                    this.beatLength
                );
            }
            this.unselectCurrentNotes();
            if (cycle < 1) {
                this.currentNotesValuesArr = [this.nextNoteValue];
            } else {
                this.currentNotesValuesArr.push(this.nextNoteValue);
            }
            this.nextNoteValue = this.nextNoteIter.next().value;
            this.selectCurrentNotes();
            if (!this.nextNoteValue) {
                setTimeout(this.restart.bind(this), 1000);
                return;
            }
            ++cycle;
        }
        window.requestAnimationFrame(this.playLoop.bind(this));
    }

    restart() {
        this.unselectCurrentNotes();
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
