import { CharacterType } from '../types/bingo.js';

class TacticalSoundFX {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // 1. Electronic Telemetry Chime (Robotic / Synthetic characters)
  playTelemetryChime() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(880, t);
    osc1.frequency.exponentialRampToValueAtTime(1760, t + 0.12);
    osc1.frequency.setValueAtTime(1320, t + 0.13);
    osc1.frequency.exponentialRampToValueAtTime(2640, t + 0.28);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(440, t);
    osc2.frequency.exponentialRampToValueAtTime(880, t + 0.12);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.36);
    osc2.stop(t + 0.36);
  }

  // 2. High-Frequency Crystal Chime (Female characters)
  playCrystalChime() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [1046.5, 1318.5, 1567.98, 2093.0]; // C6, E6, G6, C7
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = t + idx * 0.04;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.15, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.45);
    });
  }

  // 3. Tactical Stark Radio Beep (Male characters)
  playRadioBeep() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(750, t);
    osc.frequency.setValueAtTime(950, t + 0.06);

    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.18);
  }

  // Voiceover alert dispatcher based on character type
  playCharacterChime(type: CharacterType) {
    if (type === 'robotic') {
      this.playTelemetryChime();
    } else if (type === 'female') {
      this.playCrystalChime();
    } else {
      this.playRadioBeep();
    }
  }

  // 4. Clock-Ticking Sound Effect (Final 5 seconds)
  playClockTick(isUrgent = false) {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(isUrgent ? 1200 : 800, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.04);

    gain.gain.setValueAtTime(isUrgent ? 0.25 : 0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.06);
  }

  // 5. Digital Transition Chime (Flash Reveal microsecond)
  playFlashRevealChime() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, t); // D5
    osc.frequency.exponentialRampToValueAtTime(1174.66, t + 0.18); // D6

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.26);
  }

  // 6. Final Alert Buzzer (Q15 Mission Concluded)
  playFinalMissionBuzzer() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Dramatic low dual brass hit
    [110, 164.81].forEach((freq) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 1.3);
    });
  }

  // 7. Correct Tile Stamped (Tactical energy lock)
  playCorrectStamp() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, t); // C5
    osc.frequency.setValueAtTime(659.25, t + 0.08); // E5
    osc.frequency.setValueAtTime(783.99, t + 0.16); // G5
    osc.frequency.setValueAtTime(1046.5, t + 0.24); // C6

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.5);
  }

  // 8. Incorrect Selection Buzz (Error lockout)
  playIncorrectBuzz() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.setValueAtTime(110, t + 0.12);

    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  // 9. Dimension Column Completion (Gold Strikethrough fanfare)
  playColumnCompleteFanfare() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const chord = [440, 554.37, 659.25, 880]; // A Major
    chord.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startT = t + i * 0.06;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startT);

      gain.gain.setValueAtTime(0.18, startT);
      gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.7);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startT);
      osc.stop(startT + 0.75);
    });
  }

  // 10. B-I-N-G-O Full House Victory (Multiverse Restored)
  playBingoVictoryChords() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const arpeggio = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5];
    arpeggio.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = t + idx * 0.08;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.2, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 1.25);
    });
  }

  // ==========================================
  // CINEMATIC PROLOGUE SOUND EFFECTS
  // ==========================================

  // Deep Sub-Bass Rumble & Collapse Drop
  playSubBassDrop() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(75, t);
    osc.frequency.exponentialRampToValueAtTime(24, t + 2.2);

    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(45, t);
    subOsc.frequency.exponentialRampToValueAtTime(18, t + 2.5);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.linearRampToValueAtTime(0.4, t + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 2.6);

    osc.connect(gain);
    subOsc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    subOsc.start(t);
    osc.stop(t + 2.7);
    subOsc.stop(t + 2.7);
  }

  // Reality Glitch Static Burst
  playRealityGlitchStatic() {
    this.initCtx();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.35;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * (i % 120 < 40 ? 0.9 : 0.2);
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2400;
    filter.Q.value = 4.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(this.ctx.currentTime);
  }

  // Emergency Red Klaxon Warning Pulse
  playEmergencyKlaxon() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(740, t);
    osc.frequency.linearRampToValueAtTime(580, t + 0.38);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.42);
  }

  // Lightning Crackle & Kinetic Shield Blast (Thor / Panther)
  playLightningBlast() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.45);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-3 * (i / bufferSize));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(800, t);
    filter.frequency.exponentialRampToValueAtTime(200, t + 0.4);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.28, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
  }

  // Target Lock Beep & Mechanical Heavy Latch
  playTargetLockLatch() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Dual electronic blips
    [0, 0.08].forEach((offset, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(idx === 0 ? 1760 : 3520, t + offset);

      gain.gain.setValueAtTime(0.18, t + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + offset);
      osc.stop(t + offset + 0.07);
    });

    // Mechanical latch thud
    const thud = this.ctx.createOscillator();
    const thudGain = this.ctx.createGain();
    thud.type = 'triangle';
    thud.frequency.setValueAtTime(140, t + 0.16);
    thud.frequency.exponentialRampToValueAtTime(35, t + 0.38);

    thudGain.gain.setValueAtTime(0.3, t + 0.16);
    thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.42);

    thud.connect(thudGain);
    thudGain.connect(this.ctx.destination);
    thud.start(t + 0.16);
    thud.stop(t + 0.44);
  }

  // Quantum Tunnel Warp Wipe (Iris Zoom In)
  playQuantumWipe() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(1800, t + 0.7);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, t);
    filter.frequency.exponentialRampToValueAtTime(4500, t + 0.7);

    gain.gain.setValueAtTime(0.02, t);
    gain.gain.linearRampToValueAtTime(0.28, t + 0.45);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.85);
  }

  // Teletype Terminal Click (Typewriter tick)
  playTeletypeClick() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2400 + Math.random() * 400, t);

    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.03);
  }

  // Radio Static Squelch Chirp (Distress frequency ping)
  playRadioStaticChirp() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.09);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, t);
    filter.frequency.linearRampToValueAtTime(800, t + 0.08);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(t);
  }

  // ==========================================
  // MISS MINUTES & 1960s TVA FILM SOUND EFFECTS
  // ==========================================

  // 1960s TVA Educational Film Projector Chime & Optical Soundhead Start
  playTVAFilmIntroChime() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Optical projector motor whir / start hum
    const hum = this.ctx.createOscillator();
    const humGain = this.ctx.createGain();
    hum.type = 'triangle';
    hum.frequency.setValueAtTime(110, t);
    hum.frequency.exponentialRampToValueAtTime(55, t + 0.35);
    humGain.gain.setValueAtTime(0.08, t);
    humGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    hum.connect(humGain);
    humGain.connect(this.ctx.destination);
    hum.start(t);
    hum.stop(t + 0.36);

    // Cheerful 2-tone vintage cartoon bell chime (F5: 698.46Hz -> A5: 880Hz)
    [
      { freq: 698.46, delay: 0.04 },
      { freq: 880.0, delay: 0.16 },
      { freq: 1046.5, delay: 0.3 }
    ].forEach(({ freq, delay }) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startT = t + delay;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startT);

      gain.gain.setValueAtTime(0.18, startT);
      gain.gain.exponentialRampToValueAtTime(0.001, startT + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startT);
      osc.stop(startT + 0.48);
    });
  }

  // Miss Minutes Cartoon Clock Tick-Tock
  playMissMinutesTickTock() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Tick (Woodblock high)
    const tick = this.ctx.createOscillator();
    const tickGain = this.ctx.createGain();
    tick.type = 'triangle';
    tick.frequency.setValueAtTime(1200, t);
    tick.frequency.exponentialRampToValueAtTime(400, t + 0.04);
    tickGain.gain.setValueAtTime(0.16, t);
    tickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
    tick.connect(tickGain);
    tickGain.connect(this.ctx.destination);
    tick.start(t);
    tick.stop(t + 0.05);

    // Tock (Woodblock lower)
    const tock = this.ctx.createOscillator();
    const tockGain = this.ctx.createGain();
    const tockTime = t + 0.14;
    tock.type = 'triangle';
    tock.frequency.setValueAtTime(950, tockTime);
    tock.frequency.exponentialRampToValueAtTime(320, tockTime + 0.04);
    tockGain.gain.setValueAtTime(0.14, tockTime);
    tockGain.gain.exponentialRampToValueAtTime(0.001, tockTime + 0.045);
    tock.connect(tockGain);
    tockGain.connect(this.ctx.destination);
    tock.start(tockTime);
    tock.stop(tockTime + 0.05);
  }

  // TVA Nexus Event Mechanical Warble Alarm
  playNexusEventAlarm() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(820, t);
    osc.frequency.linearRampToValueAtTime(640, t + 0.25);
    osc.frequency.linearRampToValueAtTime(820, t + 0.5);

    gain.gain.setValueAtTime(0.14, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.58);
  }

  // TVA CRT Orange Screen Flash & Scanline Wipe (40th second transition)
  playTvaScreenFlash() {
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // High-frequency cathode discharge zap
    const zapOsc = this.ctx.createOscillator();
    const zapGain = this.ctx.createGain();
    zapOsc.type = 'sawtooth';
    zapOsc.frequency.setValueAtTime(1200, t);
    zapOsc.frequency.exponentialRampToValueAtTime(140, t + 0.35);
    zapGain.gain.setValueAtTime(0.20, t);
    zapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
    zapOsc.connect(zapGain);
    zapGain.connect(this.ctx.destination);
    zapOsc.start(t);
    zapOsc.stop(t + 0.40);

    // Warm resonant projector tube hum
    const humOsc = this.ctx.createOscillator();
    const humGain = this.ctx.createGain();
    humOsc.type = 'sine';
    humOsc.frequency.setValueAtTime(130, t);
    humOsc.frequency.linearRampToValueAtTime(260, t + 0.12);
    humOsc.frequency.exponentialRampToValueAtTime(65, t + 0.45);
    humGain.gain.setValueAtTime(0.22, t);
    humGain.gain.exponentialRampToValueAtTime(0.001, t + 0.50);
    humOsc.connect(humGain);
    humGain.connect(this.ctx.destination);
    humOsc.start(t);
    humOsc.stop(t + 0.52);
  }
}

export const soundFX = new TacticalSoundFX();
