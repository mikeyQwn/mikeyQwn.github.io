const DEFAULT_NOTE_TYPE = "sawtooth";
const DEFAULT_DELAY = 0;

export function playNote(
    context,
    frequency,
    duration = 0.125,
    delay = DEFAULT_DELAY,
    type = DEFAULT_NOTE_TYPE
) {
    let oscillator = context.createOscillator();
    let gain = context.createGain();

    oscillator.type = type;
    oscillator.connect(gain);
    gain.gain.value = 0.1;
    oscillator.frequency.value = frequency;
    gain.connect(context.destination);
    oscillator.start(context.currentTime + delay);
    // g.gain.setTargetAtTime(0, context.currentTime + delay, 0.01);
    gain.gain.setValueAtTime(0.1, context.currentTime + delay, 0.001);
    gain.gain.linearRampToValueAtTime(
        0,
        context.currentTime + delay + duration
    );
    // o.stop(context.currentTime + delay + duration);
}
