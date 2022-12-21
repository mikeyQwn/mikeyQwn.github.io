import { tabulatureSection } from "./tabulatureSection.js";

export const editModeCheckbox = {
    song: null,
    isEditMode: false,
    controlsContainerElement: document.createElement("div"),
    temporaryNote: null,
    setSong: (song) => {
        editModeCheckbox.song = song;
    },
    render: () => {
        const editModeCheckboxContainer = document.createElement("div");
        editModeCheckboxContainer.classList.add("edit-mode-checkbox");
        editModeCheckboxContainer.innerText = "EditMode:";

        const editModeCheckboxEl = document.createElement("input");
        editModeCheckboxEl.setAttribute("type", "checkbox");
        editModeCheckboxContainer.appendChild(editModeCheckboxEl);

        editModeCheckboxEl.onclick = () => {
            editModeCheckbox.toggleEditMode();
        };

        document.body.appendChild(editModeCheckboxContainer);
    },

    getTemporaryNoteSongPosition: () => {
        const temporaryNote = editModeCheckbox.temporaryNote;
        const highlightedRowIndex =
            tabulatureSection.rowElementsArray.findIndex((row) =>
                row.classList.contains("highlighted")
            );
        const highlightedRow =
            tabulatureSection.rowElementsArray[highlightedRowIndex];
        const highlightedRowRect = highlightedRow.getBoundingClientRect();
        const highlightedRowWidth = highlightedRowRect.width;
        const highlightedRowHeight = highlightedRowRect.height;
        const highlightedRowX = highlightedRowRect.x;
        const highlightedRowY = highlightedRowRect.y;
        const notesPerRow =
            tabulatureSection.measuresInRow * tabulatureSection.numberOfBeats;

        let temporaryNoteBeatIndex = Math.floor(
            ((temporaryNote.offsetLeft - highlightedRowX) /
                highlightedRowWidth) *
                notesPerRow
        );

        const temporaryNoteBeat =
            (temporaryNoteBeatIndex % tabulatureSection.numberOfBeats) + 1;

        const temporaryNoteString =
            Math.floor(
                ((temporaryNote.offsetTop - highlightedRowY) /
                    highlightedRowHeight) *
                    6
            ) + 2;
        const temporaryNoteMeasure =
            highlightedRowIndex * tabulatureSection.measuresInRow +
            Math.floor(
                temporaryNoteBeatIndex / tabulatureSection.numberOfBeats
            ) +
            1;

        return {
            fret: temporaryNote.fret,
            string: temporaryNoteString,
            measure: temporaryNoteMeasure,
            beat: temporaryNoteBeat
        };
    },

    submitTemporaryNote: () => {
        const { fret, string, measure, beat } =
            editModeCheckbox.getTemporaryNoteSongPosition();
        editModeCheckbox.song.addNote(fret, string, measure, beat);
    },

    handleControlsButtonOnclick: (editModeControlsInput) => {
        if (editModeCheckbox.temporaryNote) {
            editModeCheckbox.temporaryNote.remove();
            tabulatureSection.rowElementsArray.forEach((element) => {
                element.classList.remove("highlighted");
            });
        }
        editModeCheckbox.temporaryNote = document.createElement("div");
        editModeCheckbox.temporaryNote.classList.add("temporary-note");
        editModeCheckbox.temporaryNote.innerText =
            editModeControlsInput.innerText;
        editModeCheckbox.temporaryNote.fret = parseInt(
            editModeControlsInput.innerText
        );
        document.body.appendChild(editModeCheckbox.temporaryNote);
        const halfWidth = editModeCheckbox.temporaryNote.offsetWidth / 2;
        const halfHeight = editModeCheckbox.temporaryNote.offsetHeight / 2;

        const mousemoveHandler = (e) => {
            e.preventDefault();
            editModeCheckbox.temporaryNote.style.left =
                e.pageX - halfWidth + "px";
            editModeCheckbox.temporaryNote.style.top =
                e.pageY - halfHeight + "px";
            for (const row of tabulatureSection.rowElementsArray) {
                const rowRect = row.getBoundingClientRect();
                if (
                    !(
                        e.pageX >= rowRect.left &&
                        e.pageX <= rowRect.right &&
                        e.pageY >= rowRect.top &&
                        e.pageY <= rowRect.bottom
                    )
                ) {
                    row.classList.remove("highlighted");
                    continue;
                }
                row.classList.add("highlighted");
            }
        };
        editModeCheckbox.temporaryNote.onmousedown = () => {
            document.body.addEventListener("mousemove", mousemoveHandler);
            document.body.onmouseup = () => {
                document.body.removeEventListener(
                    "mousemove",
                    mousemoveHandler
                );
            };
        };
    },

    handleControlsInputOnKeyDown: (event, inputBox) => {
        if (event.key === "Backspace") inputBox.innerText = "";
        if (event.key === "Enter")
            editModeCheckbox.handleControlsButtonOnclick(inputBox);
    },

    handleControlsInputOnInput: (inputBox) => {
        inputBox.innerText = inputBox.innerText.replace(/[^0-9]/g, "");
        inputBox.innerText = inputBox.innerText.split("").reverse().join("");
        inputBox.innerText =
            parseInt(inputBox.innerText) > 24
                ? 24
                : parseInt(inputBox.innerText);
    },

    initEditModeElement: () => {
        const editModeControlsContainer = document.createElement("div");
        editModeCheckbox.controlsContainerElement = editModeControlsContainer;

        editModeControlsContainer.classList.add("edit-mode-controls-container");

        const editModeControlsInput = document.createElement("div");
        editModeControlsInput.setAttribute("contenteditable", "true");
        editModeControlsInput.onkeydown = (event) => {
            editModeCheckbox.handleControlsInputOnKeyDown(
                event,
                editModeControlsInput
            );
        };
        editModeControlsInput.oninput = () => {
            editModeCheckbox.handleControlsInputOnInput(editModeControlsInput);
        };

        editModeControlsContainer.appendChild(editModeControlsInput);

        const editModeControlsButton = document.createElement("button");
        editModeControlsContainer.appendChild(editModeControlsButton);
        editModeControlsButton.onclick = () => {
            editModeCheckbox.handleControlsButtonOnclick(editModeControlsInput);
        };

        const editModeSubmitButton = document.createElement("button");
        editModeControlsContainer.appendChild(editModeSubmitButton);
        editModeSubmitButton.onclick = () => {
            editModeCheckbox.submitTemporaryNote();
        };

        document.body.appendChild(editModeControlsContainer);
    },

    toggleEditMode: () => {
        editModeCheckbox.isEditMode = !editModeCheckbox.isEditMode;
        if (!editModeCheckbox.isEditMode)
            editModeCheckbox.controlsContainerElement.remove();
        if (editModeCheckbox.isEditMode) editModeCheckbox.initEditModeElement();
    }
};
