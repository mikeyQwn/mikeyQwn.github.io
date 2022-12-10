export const toggleIsMidiButton = {
    song: null,
    setSong: (song) => {
        toggleIsMidiButton.song = song;
    },
    render: () => {
        const song = toggleIsMidiButton.song;
        const toggleIsMidiButtonEl = document.createElement("button");
        toggleIsMidiButtonEl.classList.add("toggle-midi-button");
        toggleIsMidiButtonEl.onclick = () => {
            song.audioManager.toggleIsMidi();
        };
        document.body.appendChild(toggleIsMidiButtonEl);
    }
};
