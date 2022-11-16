import { CleanElecticGuitar } from "./instruments/guitars/cleanElecticGuitar.js";

const DEFAULT_MEASURES_IN_ROW = 2;
const DEFAULT_NUMBER_OF_BEATS = 4;

const container = document.getElementById("tab-content-container");

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
    const noteEl = document.createElement("div");
    noteEl.classList.add("tab-note");
    noteEl.innerText = note.fret;
    noteEl.style.left = `${sectionWidth * index}%`;
    noteEl.style.top = `${(100 / 5) * (note.string - 1) - 10}%`;
    noteEl.onclick = () => console.log(note);
    rowEl.appendChild(noteEl);
};

const renderNotes = (
    songTabulature,
    rowElementsArray,
    numberOfBeats = DEFAULT_NUMBER_OF_BEATS,
    measuresInRow = DEFAULT_MEASURES_IN_ROW
) => {
    songTabulature.forEach((note) => {
        const numberOfSections = measuresInRow * numberOfBeats + 1;
        const rowIndex = Math.floor((note.measure - 1) / measuresInRow);
        const sectionIndex =
            ((note.measure - 1) % measuresInRow) * numberOfBeats + note.beat;
        console.log(sectionIndex);
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
    const measureLineImg = createUnselectableImg("svg/measureLine.svg");
    measureLineImg.classList.add("measure-line");
    for (let i = 1; i < measuresInRow; ++i) {
        const measure = measureLineImg.cloneNode();
        measure.style.left = `calc(${(100 / measuresInRow) * i}% - 3.5px)`;
        rowElement.appendChild(measure);
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
    const rowArray = new Array(numberOfRows);
    const tabRowSvg = createUnselectableImg("svg/tabRowStrings.svg");
    for (let i = 0; i < numberOfRows; ++i) {
        const row = createRow(tabRowSvg);
        container.appendChild(row);
        rowArray[i] = row;
    }
    return rowArray;
}
export function renderVisual(songTabulature) {
    const measuresCount = songTabulature.reduce(
        (prev, curr) => (prev < curr.measure ? curr.measure : prev),
        0
    );
    const rowElementsArray = renderRows(measuresCount);
    rowElementsArray.forEach((e) => renderRowMeasureLines(e));
    renderNotes(songTabulature, rowElementsArray);
}
