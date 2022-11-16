import { getNoteFrequency } from "./noteString.js";

export class GenericNote {
    constructor(note, measure, beat) {
        this.note = note;
        this.frequency = getNoteFrequency(note);
        this.measure = measure;
        this.beat = beat;
    }
}
