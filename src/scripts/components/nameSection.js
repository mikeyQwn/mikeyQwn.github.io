export const nameSection = {
    updateName: (name) => {
        const [artist, title] = name.split("-");
        const artistEl = document.getElementById("artist-of-the-song");
        const titleEl = document.getElementById("title-of-the-song");
        artistEl.innerText = artist;
        titleEl.innerText = title;
    }
};
