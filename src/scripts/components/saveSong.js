import { songListSection } from "./songListSection.js";

export const saveSong = {
    song: null,
    isMidi: true,
    setSong: (song) => {
        saveSong.song = song;
    },
    render: () => {
        const saveSongButtonEl = document.createElement("button");
        saveSongButtonEl.classList.add("save-song-button");
        saveSongButtonEl.innerText = "Save song";
        saveSongButtonEl.onclick = () => {
            songListSection.addEditedSong();
        };
        document.body.appendChild(saveSongButtonEl);
    }
};
