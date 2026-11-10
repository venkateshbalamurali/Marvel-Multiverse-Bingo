const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sampleRate = 44100;
const bpm = 110;
const beat = 60 / bpm; // ~0.545 seconds
const totalMeasures = 16;
const totalDuration = totalMeasures * 4 * beat; // ~34.9 seconds
const totalSamples = Math.floor(sampleRate * totalDuration);

// Stereo buffers
const leftBuffer = new Float32Array(totalSamples);
const rightBuffer = new Float32Array(totalSamples);

// Helper: Note name to frequency
const noteFreqs = {
  'D2': 73.42, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'Bb2': 116.54, 'C3': 130.81,
  'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'Bb3': 233.08, 'C4': 261.63,
  'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'Bb4': 466.16, 'C5': 523.25,
  'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'Bb5': 932.33, 'C6': 1046.50
};

// Add synthesized sound to buffers
function addVoice({ freq, startTime, duration, gain = 0.2, type = 'brass', pan = 0 }) {
  const startSample = Math.floor(startTime * sampleRate);
  const endSample = Math.min(totalSamples, startSample + Math.floor(duration * sampleRate));
  const numSamples = endSample - startSample;
  if (numSamples <= 0 || startSample >= totalSamples) return;

  const leftPan = Math.cos((pan + 1) * Math.PI / 4);
  const rightPan = Math.sin((pan + 1) * Math.PI / 4);

  // Attack, Decay, Sustain, Release
  const attack = Math.min(0.08, duration * 0.15);
  const release = Math.min(0.12, duration * 0.25);
  const sustainLevel = 0.8;

  for (let i = 0; i < numSamples; i++) {
    const idx = startSample + i;
    if (idx >= totalSamples) break;
    const t = i / sampleRate;

    // Envelope
    let env = 1.0;
    if (t < attack) {
      env = t / attack;
    } else if (t > duration - release) {
      env = (duration - t) / release;
    } else {
      env = 1.0 - (1.0 - sustainLevel) * ((t - attack) / (duration - release));
    }
    if (env < 0) env = 0;

    // Vibrato
    const vibrato = type === 'brass' ? 1 + 0.006 * Math.sin(2 * Math.PI * 5.2 * t) : 1 + 0.008 * Math.sin(2 * Math.PI * 6.0 * t);
    const currentFreq = freq * vibrato;

    let sample = 0;
    if (type === 'brass') {
      // Warm French Horn / Trumpet timbre: rich fundamental + 2nd, 3rd, 4th, 5th harmonics
      sample = 0.45 * Math.sin(2 * Math.PI * currentFreq * t)
             + 0.32 * Math.sin(4 * Math.PI * currentFreq * t)
             + 0.20 * Math.sin(6 * Math.PI * currentFreq * t)
             + 0.10 * Math.sin(8 * Math.PI * currentFreq * t)
             + 0.05 * Math.sin(10 * Math.PI * currentFreq * t);
    } else if (type === 'strings') {
      // Warm bowed string section: saw-like multi-phase harmonics
      sample = 0.35 * Math.sin(2 * Math.PI * currentFreq * t)
             + 0.25 * Math.sin(4 * Math.PI * currentFreq * t * 1.002)
             + 0.18 * Math.sin(6 * Math.PI * currentFreq * t * 0.998)
             + 0.12 * Math.sin(8 * Math.PI * currentFreq * t)
             + 0.08 * Math.sin(10 * Math.PI * currentFreq * t);
    } else if (type === 'bass') {
      // Heavy low brass / cello
      sample = 0.60 * Math.sin(2 * Math.PI * currentFreq * t)
             + 0.35 * Math.sin(4 * Math.PI * currentFreq * t)
             + 0.15 * Math.sin(6 * Math.PI * currentFreq * t);
    }

    const val = sample * env * gain;
    leftBuffer[idx] += val * leftPan;
    rightBuffer[idx] += val * rightPan;
  }
}

// Add Timpani Strike
function addTimpani(startTime, freq = 73.42, gain = 0.35) {
  const startSample = Math.floor(startTime * sampleRate);
  const dur = 1.2;
  const numSamples = Math.floor(dur * sampleRate);

  for (let i = 0; i < numSamples; i++) {
    const idx = startSample + i;
    if (idx >= totalSamples) break;
    const t = i / sampleRate;

    // Pitch drop
    const currentFreq = freq * (1 + 0.5 * Math.exp(-t * 12));
    const env = Math.exp(-t * 3.5);
    const body = Math.sin(2 * Math.PI * currentFreq * t);
    const punch = (Math.random() * 2 - 1) * Math.exp(-t * 28) * 0.3;

    const val = (body + punch) * env * gain;
    leftBuffer[idx] += val * 0.7;
    rightBuffer[idx] += val * 0.7;
  }
}

// Add Snare / Orchestral Percussion Hit
function addSnare(startTime, gain = 0.18) {
  const startSample = Math.floor(startTime * sampleRate);
  const dur = 0.25;
  const numSamples = Math.floor(dur * sampleRate);

  for (let i = 0; i < numSamples; i++) {
    const idx = startSample + i;
    if (idx >= totalSamples) break;
    const t = i / sampleRate;
    const env = Math.exp(-t * 18);
    const noise = (Math.random() * 2 - 1) * env * gain;
    leftBuffer[idx] += noise * 0.6;
    rightBuffer[idx] += noise * 0.6;
  }
}

// Add Crash Cymbal
function addCymbal(startTime, gain = 0.22) {
  const startSample = Math.floor(startTime * sampleRate);
  const dur = 2.5;
  const numSamples = Math.floor(dur * sampleRate);

  for (let i = 0; i < numSamples; i++) {
    const idx = startSample + i;
    if (idx >= totalSamples) break;
    const t = i / sampleRate;
    const env = Math.exp(-t * 1.8);
    const noise = (Math.random() * 2 - 1) * env * gain;
    leftBuffer[idx] += noise * 0.8;
    rightBuffer[idx] += noise * 0.8;
  }
}

console.log('Synthesizing Alan Silvestri Avengers Theme...');

// 1. DRIVING STRING OSTINATO & RHYTHM SECTION (16 Measures)
for (let m = 0; m < totalMeasures; m++) {
  const mTime = m * 4 * beat;

  // Timpani on downbeat of measures
  if (m % 2 === 0) {
    addTimpani(mTime, 73.42, 0.40); // D2
  } else {
    addTimpani(mTime, 87.31, 0.30); // F2
  }

  // Crash cymbal on dramatic section changes
  if (m === 0 || m === 4 || m === 8 || m === 12) {
    addCymbal(mTime, 0.28);
  }

  // 16th-note driving low string ostinatos (D-D-D-D triplets and driving eighths)
  for (let b = 0; b < 4; b++) {
    const bTime = mTime + b * beat;
    addVoice({ freq: noteFreqs['D2'], startTime: bTime, duration: beat * 0.45, gain: 0.22, type: 'bass', pan: -0.3 });
    addVoice({ freq: noteFreqs['D3'], startTime: bTime + beat * 0.5, duration: beat * 0.45, gain: 0.18, type: 'bass', pan: 0.3 });

    // Snare military rhythm accents on beats 2 & 4
    if (b === 1 || b === 3) {
      addSnare(bTime, 0.14);
      addSnare(bTime + beat * 0.5, 0.10);
    }
  }

  // Sustained mid string harmony chords
  // Measures 0-3: Dm | Bb | C | Dm
  // Measures 4-7: Dm | Bb | C | A
  // Measures 8-11: Dm | F | G | A
  // Measures 12-15: Bb | C | Dm | Dm
  let chord = ['D3', 'F3', 'A3'];
  const mMod = m % 4;
  if (m < 8) {
    if (mMod === 0) chord = ['D3', 'F3', 'A3']; // Dm
    if (mMod === 1) chord = ['Bb2', 'D3', 'F3']; // Bb
    if (mMod === 2) chord = ['C3', 'E3', 'G3']; // C
    if (mMod === 3) chord = m < 4 ? ['D3', 'F3', 'A3'] : ['A2', 'C#3', 'E3']; // Dm or A
  } else {
    if (mMod === 0) chord = ['D3', 'F3', 'A3']; // Dm
    if (mMod === 1) chord = ['F3', 'A3', 'C4']; // F
    if (mMod === 2) chord = ['G3', 'Bb3', 'D4']; // G
    if (mMod === 3) chord = ['A3', 'C#4', 'E4']; // A
  }

  chord.forEach((n, idx) => {
    addVoice({
      freq: noteFreqs[n] || 220,
      startTime: mTime,
      duration: 4 * beat * 0.95,
      gain: 0.12,
      type: 'strings',
      pan: (idx - 1) * 0.4
    });
  });
}

// 2. THE LEGENDARY ALAN SILVESTRI MELODY (French Horns & Trumpets)
// Phrase 1 (Measure 2 to 5):
// D4 (1.5 beats) -> F4 (0.5 beats) -> G4 (1 beat) -> A4 (2 beats)
// G4 (1.5 beats) -> F4 (0.5 beats) -> D4 (2 beats)
const phrase1 = [
  { note: 'D4', beats: 1.5 },
  { note: 'F4', beats: 0.5 },
  { note: 'G4', beats: 1.0 },
  { note: 'A4', beats: 2.0 },
  { note: 'G4', beats: 1.5 },
  { note: 'F4', beats: 0.5 },
  { note: 'D4', beats: 3.0 }
];

// Phrase 2 (Measure 6 to 9):
// D4 (1.5 beats) -> F4 (0.5 beats) -> G4 (1 beat) -> A4 (2 beats)
// C5 (1 beat) -> Bb4 (1 beat) -> A4 (3 beats)
const phrase2 = [
  { note: 'D4', beats: 1.5 },
  { note: 'F4', beats: 0.5 },
  { note: 'G4', beats: 1.0 },
  { note: 'A4', beats: 2.0 },
  { note: 'C5', beats: 1.0 },
  { note: 'Bb4', beats: 1.0 },
  { note: 'A4', beats: 3.0 }
];

// Phrase 3 (Measure 10 to 15 - The Grand Climax):
// F4 (1 beat) -> G4 (1 beat) -> A4 (1 beat) -> D5 (2 beats) -> C5 (1 beat)
// Bb4 (1 beat) -> A4 (1 beat) -> G4 (1 beat) -> A4 (2 beats) -> F4 (1 beat) -> D4 (4 beats)
const phrase3 = [
  { note: 'F4', beats: 1.0 },
  { note: 'G4', beats: 1.0 },
  { note: 'A4', beats: 1.0 },
  { note: 'D5', beats: 2.0 },
  { note: 'C5', beats: 1.0 },
  { note: 'Bb4', beats: 1.0 },
  { note: 'A4', beats: 1.0 },
  { note: 'G4', beats: 1.0 },
  { note: 'A4', beats: 2.0 },
  { note: 'F4', beats: 1.0 },
  { note: 'D4', beats: 4.0 }
];

function playMelodySequence(seq, startMeasure) {
  let currTime = startMeasure * 4 * beat;
  seq.forEach((item) => {
    const dur = item.beats * beat;
    const f = noteFreqs[item.note];
    if (f) {
      // Main French Horn lead
      addVoice({ freq: f, startTime: currTime, duration: dur * 0.96, gain: 0.36, type: 'brass', pan: -0.15 });
      // Octave reinforcement (Trumpet / High Horn)
      addVoice({ freq: f * 2, startTime: currTime, duration: dur * 0.96, gain: 0.18, type: 'brass', pan: 0.15 });
      // Supporting String doubling
      addVoice({ freq: f, startTime: currTime, duration: dur * 0.96, gain: 0.14, type: 'strings', pan: 0.25 });
    }
    currTime += dur;
  });
}

// Schedule melodic statements
playMelodySequence(phrase1, 2);
playMelodySequence(phrase2, 5.5);
playMelodySequence(phrase3, 9.5);

// Normalize & write 16-bit PCM WAV
let maxAmp = 0;
for (let i = 0; i < totalSamples; i++) {
  if (Math.abs(leftBuffer[i]) > maxAmp) maxAmp = Math.abs(leftBuffer[i]);
  if (Math.abs(rightBuffer[i]) > maxAmp) maxAmp = Math.abs(rightBuffer[i]);
}

const normFactor = maxAmp > 0 ? 0.92 / maxAmp : 1.0;
const pcmBytes = totalSamples * 4; // 16-bit stereo = 4 bytes per sample
const wavBuffer = Buffer.alloc(44 + pcmBytes);

// Write WAV Header
wavBuffer.write('RIFF', 0);
wavBuffer.writeUInt32LE(36 + pcmBytes, 4);
wavBuffer.write('WAVE', 8);
wavBuffer.write('fmt ', 12);
wavBuffer.writeUInt32LE(16, 16);
wavBuffer.writeUInt16LE(1, 20); // PCM
wavBuffer.writeUInt16LE(2, 22); // 2 channels (stereo)
wavBuffer.writeUInt32LE(sampleRate, 24);
wavBuffer.writeUInt32LE(sampleRate * 4, 28); // byte rate
wavBuffer.writeUInt16LE(4, 32); // block align
wavBuffer.writeUInt16LE(16, 34); // bits per sample
wavBuffer.write('data', 36);
wavBuffer.writeUInt32LE(pcmBytes, 40);

let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  const l = Math.max(-1, Math.min(1, leftBuffer[i] * normFactor));
  const r = Math.max(-1, Math.min(1, rightBuffer[i] * normFactor));

  const lInt = Math.floor(l * 32767);
  const rInt = Math.floor(r * 32767);

  wavBuffer.writeInt16LE(lInt, offset);
  wavBuffer.writeInt16LE(rInt, offset + 2);
  offset += 4;
}

const wavPath = path.join(__dirname, '../public/audio/avengers_theme.wav');
const mp3Path = path.join(__dirname, '../public/audio/avengers_theme.mp3');

fs.writeFileSync(wavPath, wavBuffer);
console.log(`Generated WAV: ${wavPath} (${(wavBuffer.length / 1024 / 1024).toFixed(2)} MB)`);

// Encode to MP3 with ffmpeg
try {
  execSync(`ffmpeg -y -i "${wavPath}" -codec:a libmp3lame -b:a 192k "${mp3Path}"`);
  console.log(`Successfully generated Alan Silvestri Avengers Theme MP3: ${mp3Path}`);
  fs.unlinkSync(wavPath);
} catch (e) {
  console.log('ffmpeg error or fallback:', e.message);
}
