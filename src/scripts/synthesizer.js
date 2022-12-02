export function playNote(context, delay, frequency, type, duration = 0.125) {
    let o;
    let g;
    o = context.createOscillator();
    g = context.createGain();
    o.type = type;
    o.connect(g);
    g.gain.value = 1;
    o.frequency.value = frequency;
    g.connect(context.destination);
    console.log({ delay, duration, time: context.currentTime });
    o.start(context.currentTime + delay);
    // g.gain.setTargetAtTime(0, context.currentTime + delay, 0.01);
    g.gain.setValueAtTime(1, context.currentTime + delay, 0.001);
    g.gain.linearRampToValueAtTime(0, context.currentTime + delay + duration);
    // o.stop(context.currentTime + delay + duration);
}
