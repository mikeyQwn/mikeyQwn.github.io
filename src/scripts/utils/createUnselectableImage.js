function createOneUnselectableImg(source) {
    const unselectable = new Image();
    unselectable.src = source;
    unselectable.classList.add("unselectable");
    unselectable.style.width = unselectable.style.height = "100%";
    return unselectable;
}

export function createUnselectableImg(source, ...otherSources) {
    if (otherSources.length === 0) return createOneUnselectableImg(source);
    return [
        createOneUnselectableImg(source),
        ...otherSources.map((source) => createOneUnselectableImg(source))
    ];
}
