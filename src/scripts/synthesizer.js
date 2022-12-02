export function playNote(context, delay, frequency, type, duration = 2) {
    let o;
    let g;
    o = context.createOscillator();
    g = context.createGain();
    o.type = type;
    o.connect(g);
    g.gain.value = 0.5;
    g.connect(context.destination);
    console.log({ delay, duration, time: context.currentTime });
    o.start(context.currentTime + delay);
    g.gain.setTargetAtTime(0.5, context.currentTime + delay, 0.01);
    g.gain.exponentialRampToValueAtTime(
        0.0001,
        context.currentTime + delay + duration
    );
    o.frequency.value = frequency;
    // g.gain.exponentialRampToValueAtTime(
    //     0.0001,
    //     context.currentTime + delay + duration
    // );
}
