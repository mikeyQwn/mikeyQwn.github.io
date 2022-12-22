import { renderSong } from "../render.js";
import { loadLocalStorageSong, loadSong } from "../utils/loader.js";

const songList = ["MCR-ThankYou-For-The-Venom", "Twinkle-Twinkle-Little-Star"];

const container = document.getElementById("song-list-container");
export const songListSection = {
    isRendered: false,
    editedSong: null,
    song: null,
    setSong: (song) => {
        songListSection.song = song;
    },
    async render() {
        if (songListSection.isRendered) return;
        container.innerHTML = "<h3>Song list</h3>";

        for (const songName of songList) {
            const songListItem = document.createElement("li");
            songListItem.className = "song-list-item";
            songListItem.innerText = songName;
            songListItem.onclick = () => {
                loadSong(`./src/assets/songs/${songName}.json`).then((song) => {
                    renderSong(song);
                });
            };
            container.appendChild(songListItem);
        }
        songListSection.isRendered = true;
        if (localStorage.getItem("edited-song")) {
            songListSection.editedSong = JSON.parse(
                localStorage.getItem("edited-song")
            );
            const songListItem = document.createElement("li");
            songListItem.className = "song-list-item";
            songListItem.innerText = "Edited song";
            songListItem.onclick = () => {
                const song = loadLocalStorageSong();
                renderSong(song);
            };
            container.appendChild(songListItem);
            songListSection.editedSong = songListItem;
        }
    },
    addEditedSong: () => {
        if (songListSection.editedSong) {
            songListSection.editedSong.remove();
        }
        const audioManager = songListSection.song.audioManager;
        songListSection.song.audioManager = null;
        localStorage.setItem(
            "edited-song",
            JSON.stringify(songListSection.song)
        );
        songListSection.song.audioManager = audioManager;
        songListSection.editedSong = document.createElement("li");
        songListSection.editedSong.className = "song-list-item";
        songListSection.editedSong.innerText = "Edited song";
        container.appendChild(songListSection.editedSong);
        songListSection.editedSong.onclick = () => {
            const song = loadLocalStorageSong();
            renderSong(song);
        };
    }
};
