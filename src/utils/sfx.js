let audioContext;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

export function playFuturisticClick() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const carrier = ctx.createOscillator();
    const modulator = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    carrier.type = "square";
    carrier.frequency.setValueAtTime(760, now);
    carrier.frequency.exponentialRampToValueAtTime(420, now + 0.06);

    modulator.type = "sine";
    modulator.frequency.setValueAtTime(24, now);

    const modulation = ctx.createGain();
    modulation.gain.setValueAtTime(90, now);
    modulator.connect(modulation).connect(carrier.frequency);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1000, now);
    filter.Q.setValueAtTime(6, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    carrier.connect(filter).connect(gain).connect(ctx.destination);

    modulator.start(now);
    carrier.start(now);
    modulator.stop(now + 0.14);
    carrier.stop(now + 0.14);
  } catch {
    // Ignore audio errors
  }
}
