export const toggleIsMidiButton = {
    renderToggleIsMidiButton: (song) => {
        const toggleIsMidiButton = document.createElement("button");
        toggleIsMidiButton.classList.add("toggle-midi-button");
        toggleIsMidiButton.onclick = () => {
            song.audioManager.toggleIsMidi();
        };
        document.body.appendChild(toggleIsMidiButton);
    }
};
