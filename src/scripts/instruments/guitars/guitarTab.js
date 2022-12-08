import { GenericNote } from "../../song.js";
import { getNoteHalfToneUp } from "../../utils/noteString.js";

const NUMBER_OF_FRETS = 24;

const getAllNotesOfString = (firstNote, numberOfFrets) => {
    const frets = new Array(numberOfFrets);
    let currentNote = firstNote;
    frets[0] = firstNote;
    for (let fretNumber = 1; fretNumber < frets.length; fretNumber++) {
        currentNote = getNoteHalfToneUp(currentNote);
        frets[fretNumber] = currentNote;
    }
    return frets;
};

export const generateGuitarKeyMap = (
    tuning = ["E4", "B3", "G3", "D3", "A2", "E2"]
) => {
    return tuning.map((e) => getAllNotesOfString(e, NUMBER_OF_FRETS));
};

export class GuitarTab {
    constructor(tabulature, tuning) {
        this.tabulature = tabulature;
        this.tuning = tuning;
        this.keyMap = generateGuitarKeyMap(tuning);
    }

    getArrayOfGenericNotes() {
        const arrayOfNotes = [];
        for (const note of this.tabulature) {
            arrayOfNotes.push(
                new GenericNote(
                    this.keyMap[note.string - 1][note.fret],
                    note.measure,
                    note.beat,
                    note.element
                )
            );
        }
        return arrayOfNotes;
    }

    getTuning() {
        return this.tuning.join("").replace(/\d/g, "");
    }

    getTabulature() {
        return this.tabulature;
    }

    static printArrayOfGuitarNotes(array) {
        const song = new Array(10).fill([]).map(() => new Array(6).fill("-"));
        for (const note of array) {
            song[note.measure][note.beat] = note.fret;
        }
        for (let i = 0; i < song[0].length; ++i) {
            const row = [];
            for (let j = 0; j < song.length; ++j) {
                row.push(song[j][i]);
            }
            console.log(row);
        }
    }
}

export class guitarTabSymbol {
    constructor(fret, string, measure, beat) {
        this.fret = fret;
        this.string = string;
        this.measure = measure;
        this.beat = beat;
    }
}
