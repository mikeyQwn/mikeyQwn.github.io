const context = new AudioContext();
let o;
let g;

export function playNote(frequency, type, duration = 2) {
    console.log(frequency);
    o = context.createOscillator();
    g = context.createGain();
    o.type = type;
    o.connect(g);
    g.gain.value = 0.5;
    o.frequency.value = frequency;
    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
}
