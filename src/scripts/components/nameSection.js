export const nameSection = {
    song: null,
    setSong: (song) => {
        nameSection.song = song;
    },
    render: () => {
        const name = nameSection.song.getName();
        const [artist, title] = name.split("-");
        const artistEl = document.getElementById("artist-of-the-song");
        const titleEl = document.getElementById("title-of-the-song");
        artistEl.innerText = artist;
        titleEl.innerText = title;
    }
};
