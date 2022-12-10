const firstRowContainer = document.getElementById("first-tab-row-container");

export const tuninigElement = {
    renderTuning: (tuning) => {
        const tuningEl = document.createElement("div");
        tuningEl.classList.add("tuning-element");
        firstRowContainer.appendChild(tuningEl);
        tuningEl.innerText = tuning;
    }
};
