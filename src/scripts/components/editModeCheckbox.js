export const editModeCheckbox = {
    song: null,
    isEditMode: false,
    controlsContainerElement: document.createElement("div"),
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

    handleControlsButtonOnclick: (editModeControlsInput) => {
        const temporaryNote = document.createElement("div");
        temporaryNote.classList.add("temporary-note");
        temporaryNote.innerText = editModeControlsInput.innerText;

        document.body.appendChild(temporaryNote);
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

        document.body.appendChild(editModeControlsContainer);
    },

    toggleEditMode: () => {
        editModeCheckbox.isEditMode = !editModeCheckbox.isEditMode;
        if (!editModeCheckbox.isEditMode)
            editModeCheckbox.controlsContainerElement.remove();
        if (editModeCheckbox.isEditMode) editModeCheckbox.initEditModeElement();
    }
};
