const firstRowContainer = document.getElementById("first-tab-row-container");

export const tuninigElement = {
    song: null,
    tuninigElementContaier: null,
    setSong: (song) => {
        tuninigElement.song = song;
    },
    render: () => {
        if (tuninigElement.tuninigElementContaier) return;
        const tuning = tuninigElement.song.getTabulatureObject().getTuning();
        const tuningEl = document.createElement("div");
        tuningEl.classList.add("tuning-element");
        tuningEl.classList.add("unselectable");
        firstRowContainer.appendChild(tuningEl);
        tuningEl.innerText = tuning;
        tuninigElement.tuninigElementContaier = tuningEl;
    }
};
