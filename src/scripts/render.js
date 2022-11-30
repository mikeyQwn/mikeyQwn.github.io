import { CleanElecticGuitar } from "./instruments/guitars/cleanElecticGuitar.js";

const DEFAULT_MEASURES_IN_ROW = 2;
const DEFAULT_NUMBER_OF_BEATS = 4;

const container = document.getElementById("tab-content-container");
const firstRowContainer = document.getElementById("first-tab-row-container");

const instruments = [CleanElecticGuitar];

export function renderInstruments() {
    const instrumentSection = document.getElementById(
        "bottom-navbar-buttons-container"
    );

    for (const instrument of instruments) {
        const button = document.createElement("button");
        button.classList.add("instrument-button");
        button.appendChild(instrument.getIcon());

        instrumentSection.appendChild(button);
    }
}

const renderNote = (rowEl, sectionWidth, note, index) => {
    const topOffsetPercent = 20;
    const offsetPercntDelta = (100 + topOffsetPercent) / 5;

    const noteEl = document.createElement("div");
    noteEl.classList.add("tab-note");
    noteEl.innerText = note.fret;
    console.log({ 1: noteEl.offsetWidth });
    noteEl.style.top = `${
        offsetPercntDelta * (note.string - 1) - topOffsetPercent
    }%`;
    noteEl.onclick = () => console.debug(note);
    rowEl.appendChild(noteEl);
    noteEl.style.left = `calc(${sectionWidth * index + sectionWidth / 2}% - ${
        noteEl.offsetWidth / 2
    }px)`;
};
const renderNotes = (
    songTabulature,
    rowElementsArray,
    measuresInRow = DEFAULT_MEASURES_IN_ROW,
    numberOfBeats = DEFAULT_NUMBER_OF_BEATS
) => {
    songTabulature.forEach((note) => {
        const numberOfSections = measuresInRow * numberOfBeats;
        const rowIndex = Math.floor((note.measure - 1) / measuresInRow);
        const sectionIndex =
            ((note.measure - 1) % measuresInRow) * numberOfBeats +
            note.beat -
            1;
        const sectionWidth = 100 / numberOfSections;
        renderNote(
            rowElementsArray[rowIndex],
            sectionWidth,
            note,
            sectionIndex
        );
    });
};
const renderRowMeasureLines = (
    rowElement,
    measuresInRow = DEFAULT_MEASURES_IN_ROW
) => {
    const measureLineImg = createUnselectableImg(
        "./src/assets/svg/measureLine.svg"
    );
    measureLineImg.classList.add("measure-line");
    for (let i = 1; i < measuresInRow; ++i) {
        const measure = measureLineImg.cloneNode();
        rowElement.appendChild(measure);
        measure.style.left = `calc(${(100 / measuresInRow) * i}% - ${
            measure.offsetWidth / 2
        }px)`;
    }
};
const createRow = (tabRowSvg) => {
    const row = document.createElement("div");
    row.classList.add("tab-row");
    row.appendChild(tabRowSvg.cloneNode());
    return row;
};
const createUnselectableImg = (source) => {
    const tabRowImg = new Image();
    tabRowImg.src = source;
    tabRowImg.classList.add("unselectable");
    tabRowImg.style.width = tabRowImg.style.height = "100%";
    return tabRowImg;
};
function renderRows(measuresCount, measuresInRow = DEFAULT_MEASURES_IN_ROW) {
    const numberOfRows = Math.ceil(measuresCount / measuresInRow);
    console.debug({ numberOfRows });
    const rowArray = new Array(numberOfRows);
    console.log({ rowArray });
    const tabRowSvg = createUnselectableImg(
        "./src/assets/svg/tabRowStrings.svg"
    );
    const firstRow = createRow(tabRowSvg);
    firstRowContainer.appendChild(firstRow);
    rowArray[0] = firstRow;
    for (let i = 0; i < numberOfRows - 1; ++i) {
        const row = createRow(tabRowSvg);
        container.appendChild(row);
        rowArray[i + 1] = row;
    }
    console.log(rowArray);
    return rowArray;
}
export function renderVisual(songTabulature, measuresInRow, numberOfBeats) {
    const measuresCount = songTabulature.reduce(
        (prev, curr) => (prev < curr.measure ? curr.measure : prev),
        0
    );
    console.log({ measuresCount });
    const rowElementsArray = renderRows(measuresCount, measuresInRow);
    rowElementsArray.forEach((e) => renderRowMeasureLines(e, measuresInRow));
    renderNotes(songTabulature, rowElementsArray, measuresInRow, numberOfBeats);
}

export function updateName(name) {
    const [artist, title] = name.split("-");
    const artistEl = document.getElementById("artist-of-the-song");
    const titleEl = document.getElementById("title-of-the-song");
    artistEl.innerText = artist;
    titleEl.innerText = title;
}

export function renderTuning(tuning) {
    const tuningEl = document.createElement("div");
    tuningEl.classList.add("tuning-element");
    firstRowContainer.appendChild(tuningEl);
    tuningEl.innerText = tuning;
}

export function renderSong(song) {
    renderInstruments();
    const { name, tempo, timeSignature, tuning, tabulature } = song;
    renderTuning(tuning);
    updateName(name);
    renderVisual(tabulature, 2, 8);
}
