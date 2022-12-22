import { createUnselectableImg } from "../utils/createUnselectableImage.js";

const DEFAULT_MEASURES_IN_ROW = 2;
const DEFAULT_NUMBER_OF_BEATS = 4;

const container = document.getElementById("tab-content-container");
const firstRowContainer = document.getElementById("first-tab-row-container");

export const renderNote = (rowEl, sectionWidth, note, index) => {
    const topOffsetPercent = 20;
    const offsetPercntDelta = (100 + topOffsetPercent) / 5;

    const noteEl = document.createElement("div");
    noteEl.classList.add("tab-note");
    noteEl.classList.add("unselectable");
    noteEl.innerText = note.fret;
    noteEl.style.top = `${
        offsetPercntDelta * (note.string - 1) - topOffsetPercent
    }%`;
    noteEl.onclick = () => console.debug(note);
    rowEl.appendChild(noteEl);
    noteEl.style.left = `calc(${sectionWidth * index + sectionWidth / 2}% - ${
        noteEl.offsetWidth / 2
    }px)`;
    return noteEl;
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
        note.element = renderNote(
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
function renderRows(measuresCount, measuresInRow = DEFAULT_MEASURES_IN_ROW) {
    const numberOfRows = Math.ceil(measuresCount / measuresInRow);
    const rowArray = new Array(numberOfRows);
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
    return rowArray;
}

export const tabulatureSection = {
    song: null,
    rowElementsArray: null,
    numberOfBeats: 8,
    measuresInRow: DEFAULT_MEASURES_IN_ROW,
    setSong: (song) => {
        tabulatureSection.song = song;
    },
    render: () => {
        const song = tabulatureSection.song;
        if (tabulatureSection.rowElementsArray)
            tabulatureSection.rowElementsArray.forEach((row) => row.remove());
        const songTabulature = song.getTabulatureObject().getTabulature();
        const measuresCount = songTabulature.reduce(
            (prev, curr) => (prev < curr.measure ? curr.measure : prev),
            0
        );
        tabulatureSection.rowElementsArray = renderRows(
            measuresCount,
            tabulatureSection.measuresInRow
        );
        tabulatureSection.rowElementsArray.forEach((e) =>
            renderRowMeasureLines(e, tabulatureSection.measuresInRow)
        );
        renderNotes(
            songTabulature,
            tabulatureSection.rowElementsArray,
            tabulatureSection.measuresInRow,
            tabulatureSection.numberOfBeats
        );
    }
};
