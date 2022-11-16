const context = new AudioContext();
let o;
let g;

export function playNote(frequency, type, duration = 1) {
    o = context.createOscillator();
    g = context.createGain();
    o.type = type;
    o.connect(g);
    g.gain.value = 1;
    o.frequency.value = frequency;
    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
}
