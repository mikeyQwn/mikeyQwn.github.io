import { GenericNote } from "../../genericNote.js";
import { getNoteHalfToneUp } from "../../noteString.js";

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
    tuning = ["E2", "A2", "D3", "G3", "B3", "E4"]
) => {
    return tuning.map((e) => getAllNotesOfString(e, NUMBER_OF_FRETS));
};

export class Guitar {
    constructor(tabulature, tuning) {
        this.tabulature = tabulature;
        this.keyMap = generateGuitarKeyMap(tuning);
    }
    getArrayOfGenericNotes() {
        const arrayOfNotes = [];
        for (const note of this.tabulature) {
            arrayOfNotes.push(
                new GenericNote(
                    this.keyMap[note.string][note.fret],
                    note.measure,
                    note.beat
                )
            );
        }
        return arrayOfNotes;
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
