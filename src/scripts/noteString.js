const noteRegex = /^([A-G][b#]?)([0-9])$/;

const NUMBER_OF_NOTES = 12;
const A4_FREQUENCY = 440;
const TWELFTH_ROOT_OF_TWO = 1.05946309436;
const DEFAULT_SPLITTED_NOTE = ["A", "4"];
const MAPPING_WITH_FLATS = [
    ["C", 0],
    ["Db", 1],
    ["D", 2],
    ["Eb", 3],
    ["E", 4],
    ["F", 5],
    ["Gb", 6],
    ["G", 7],
    ["Ab", 8],
    ["A", 9],
    ["Bb", 10],
    ["B", 11],
];
const MAPPING_FOR_SHARPS = [
    ["C#", 1],
    ["D#", 3],
    ["F#", 6],
    ["G#", 8],
    ["A#", 10],
];

const NOTE_TO_NUMBER = new Map(MAPPING_WITH_FLATS);
const aIndex = NOTE_TO_NUMBER.get("A");
for (const [name, number] of MAPPING_FOR_SHARPS) {
    NOTE_TO_NUMBER.set(name, number);
}

const NUMBER_TO_NOTE = new Map(MAPPING_WITH_FLATS.map((e) => e.reverse()));

const getNumberFromName = (note) => NOTE_TO_NUMBER.get(note);
const getNameFromNumber = (number) => NUMBER_TO_NOTE.get(number);

const getFlatNote = (note) => {
    return NUMBER_TO_NOTE.get(NOTE_TO_NUMBER.get(note));
};
const handleWrongSplittedNote = () => {
    console.error("You are trying to split non-standard note");
    return DEFAULT_SPLITTED_NOTE;
};
const splitNote = (note) => {
    const splitted = note.match(noteRegex);
    if (!splitted) {
        return handleWrongSplittedNote();
    }
    if (splitted.length !== 3) {
        return handleWrongSplittedNote();
    }
    return splitted.slice(1, 3);
};

export const getNoteFrequency = (signature) => {
    let [note, digit] = splitNote(signature);
    note = getFlatNote(note);
    return (
        A4_FREQUENCY *
        Math.pow(
            TWELFTH_ROOT_OF_TWO,
            (digit - 4) * 12 + NOTE_TO_NUMBER.get(note) - aIndex
        )
    );
};

export const getNoteHalfToneUp = (note) => {
    let [name, octave] = splitNote(note);
    let number = getNumberFromName(name) + 1;
    if (number > NUMBER_OF_NOTES - 1) {
        ++octave;
        number = number % NUMBER_OF_NOTES;
    }
    return `${getNameFromNumber(number)}${octave}`;
};
