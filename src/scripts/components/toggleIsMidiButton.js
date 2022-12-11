export const toggleIsMidiButton = {
    song: null,
    isMidi: true,
    setSong: (song) => {
        toggleIsMidiButton.song = song;
    },
    render: () => {
        const song = toggleIsMidiButton.song;
        const toggleIsMidiButtonEl = document.createElement("button");
        toggleIsMidiButtonEl.classList.add("toggle-midi-button");
        toggleIsMidiButtonEl.innerText = "Midi:on";
        toggleIsMidiButtonEl.onclick = () => {
            song.audioManager.toggleIsMidi();
            toggleIsMidiButton.isMidi = !toggleIsMidiButton.isMidi;
            toggleIsMidiButtonEl.innerText = `Midi:${
                toggleIsMidiButton.isMidi ? "on" : "off"
            }`;
        };
        document.body.appendChild(toggleIsMidiButtonEl);
    }
};
