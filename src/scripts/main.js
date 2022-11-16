import { Guitar, guitarTabSymbol } from "./instruments/guitars/guitar.js";
import { renderInstruments, renderVisual } from "./render.js";

renderInstruments();
const guitar = new Guitar([
    new guitarTabSymbol(1, 1, 1, 1),
    new guitarTabSymbol(1, 2, 1, 2),
    new guitarTabSymbol(1, 3, 1, 3),
    new guitarTabSymbol(1, 4, 1, 4),
    new guitarTabSymbol(1, 5, 2, 1),
    new guitarTabSymbol(1, 6, 2, 2)
]);

renderVisual(guitar.tabulature);
