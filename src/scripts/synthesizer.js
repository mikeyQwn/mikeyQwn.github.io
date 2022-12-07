export function playNote(context, delay, frequency, type, duration = 0.125) {
    let o;
    let g;
    o = context.createOscillator();
    g = context.createGain();
    o.type = type;
    o.connect(g);
    g.gain.value = 0.1;
    o.frequency.value = frequency;
    g.connect(context.destination);
    o.start(context.currentTime + delay);
    // g.gain.setTargetAtTime(0, context.currentTime + delay, 0.01);
    g.gain.setValueAtTime(0.1, context.currentTime + delay, 0.001);
    g.gain.linearRampToValueAtTime(0, context.currentTime + delay + duration);
    // o.stop(context.currentTime + delay + duration);
}
