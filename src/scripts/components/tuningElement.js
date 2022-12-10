const firstRowContainer = document.getElementById("first-tab-row-container");

export const tuninigElement = {
    song: null,
    setSong: (song) => {
        tuninigElement.song = song;
    },
    render: () => {
        const tuning = tuninigElement.song.getTabulatureObject().getTuning();
        const tuningEl = document.createElement("div");
        tuningEl.classList.add("tuning-element");
        firstRowContainer.appendChild(tuningEl);
        tuningEl.innerText = tuning;
    }
};
