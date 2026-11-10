import { CharacterType, MarvelQuestion } from '../types/bingo.js';
import { soundFX } from './soundEffects.js';

class OrchestralAudioEngine {
  private audioElement: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isPlaying: boolean = false;
  private currentVolume: number = 0.20;
  private targetVolume: number = 0.20;
  private fadeInterval: ReturnType<typeof setInterval> | null = null;
  private unlockListenerAttached: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    this.audioElement = new Audio('/audio/avengers_theme.mp3');
    this.audioElement.loop = true;
    this.audioElement.volume = 0.20;
    this.audioElement.preload = 'auto';

    // Global unlock handler for browser autoplay policies
    const unlockAudio = () => {
      if (this.audioElement && this.isPlaying && this.audioElement.paused) {
        this.audioElement.play().catch(() => {});
      }
    };

    if (!this.unlockListenerAttached && typeof window !== 'undefined') {
      this.unlockListenerAttached = true;
      window.addEventListener('click', unlockAudio);
      window.addEventListener('touchstart', unlockAudio);
      window.addEventListener('keydown', unlockAudio);
    }
  }

  // Start background orchestral soundtrack (exact Alan Silvestri Avengers Theme)
  startMatchSoundtrack() {
    this.isPlaying = true;
    this.currentVolume = 0.20;
    this.targetVolume = 0.20;

    if (!this.audioElement && typeof window !== 'undefined') {
      this.initAudioElement();
    }

    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : 0.20;
      if (this.audioElement.paused) {
        this.audioElement.play().catch(() => {
          // Autoplay policy will be satisfied on next user interaction via unlockAudio
        });
      }
    }
  }

  // Smooth volume transition for dynamic ducking and swells
  private fadeTo(target: number, durationMs: number, onComplete?: () => void) {
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    this.targetVolume = target;
    const startVol = this.currentVolume;
    const steps = 30;
    const stepTime = durationMs / steps;
    const volDelta = (target - startVol) / steps;
    let stepCount = 0;

    this.fadeInterval = setInterval(() => {
      stepCount++;
      this.currentVolume = Math.max(0, Math.min(1, startVol + volDelta * stepCount));

      const effectiveVol = this.isMuted ? 0 : this.currentVolume;
      if (this.audioElement) {
        this.audioElement.volume = effectiveVol;
      }

      if (stepCount >= steps) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        this.fadeInterval = null;
        this.currentVolume = target;
        if (onComplete) onComplete();
      }
    }, stepTime);
  }

  // Automated Audio Ducking: lowers to 3% - 4% (0.035) during voiceovers, re-voice, or timer clicks
  duckVolume() {
    this.fadeTo(0.035, 250);
  }

  // Smoothly swell back up to 20% (0.20) volume over 1.4 seconds
  swellVolume() {
    this.fadeTo(0.20, 1400);
  }

  // Fade out smoothly to 0% over 2.5-second interval upon match conclusion or manual exit
  stopMatchSoundtrack() {
    this.isPlaying = false;
    this.fadeTo(0, 2500, () => {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
      }
    });
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    const effective = this.isMuted ? 0 : this.currentVolume;
    if (this.audioElement) {
      this.audioElement.volume = effective;
    }
    return this.isMuted;
  }

  getMuted(): boolean {
    return this.isMuted;
  }
}

export const orchestralEngine = new OrchestralAudioEngine();

// ==========================================
class VoiceSynthesisEngine {
  private isSpeaking: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  speakQuestion(question: MarvelQuestion, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    // Cancel any previous in-flight utterance
    window.speechSynthesis.cancel();

    // 1. Play authentic 1960s TVA film projector intro chime
    soundFX.playTVAFilmIntroChime();

    // 2. Duck background music down to 4%
    orchestralEngine.duckVolume();

    // 3. Direct technical question reading for rapid delivery without preambles
    const spokenText = question.clue;
    const utterance = new SpeechSynthesisUtterance(spokenText);
    this.currentUtterance = utterance;

    // Miss Minutes TVA vocal profile: cheerful animated cartoon mascot
    utterance.pitch = 1.30;
    utterance.rate = 1.05;

    // Prioritize high-clarity animated female US English voices (like Tara Strong in Loki)
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const missMinutesVoice = voices.find(v =>
        /(samantha|victoria|zira|karen|susan|fiona|allison|ava)/i.test(v.name)
      ) || voices.find(v => /female|en-US/i.test(v.name));
      if (missMinutesVoice) utterance.voice = missMinutesVoice;
    }

    this.isSpeaking = true;

    let swellTriggered = false;
    const triggerSwellOnce = () => {
      if (swellTriggered) return;
      swellTriggered = true;
      this.isSpeaking = false;
      this.currentUtterance = null;
      // Smoothly swell back up to 20% volume gradually over 1.4 seconds
      orchestralEngine.swellVolume();
      if (onEnd) onEnd();
    };

    // Safety timeout: Phase 1 reading period is 10s. If voiceover concludes or stalls, swell back to 20%
    const safetyTimeout = setTimeout(triggerSwellOnce, 9500);

    utterance.onend = () => {
      clearTimeout(safetyTimeout);
      triggerSwellOnce();
    };

    utterance.onerror = () => {
      clearTimeout(safetyTimeout);
      triggerSwellOnce();
    };

    window.speechSynthesis.speak(utterance);
  }

  // Authentic Miss Minutes TVA Orientation Greeting
  speakMissMinutesGreeting(onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel();
    soundFX.playTVAFilmIntroChime();
    orchestralEngine.duckVolume();

    const greetingText = "Hey y'all! Welcome to the TVA! I'm Miss Minutes, and it's my job to catch y'all up before you stand trial for your offenses against the Sacred Timeline! Get your boards ready!";
    const utterance = new SpeechSynthesisUtterance(greetingText);
    utterance.pitch = 1.34;
    utterance.rate = 1.06;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const missMinutesVoice = voices.find(v =>
        /(samantha|victoria|zira|karen|susan|fiona|allison|ava)/i.test(v.name)
      ) || voices.find(v => /female/i.test(v.name));
      if (missMinutesVoice) utterance.voice = missMinutesVoice;
    }

    utterance.onend = () => {
      orchestralEngine.swellVolume();
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      orchestralEngine.swellVolume();
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  // Miss Minutes 10-Second Timer Alert
  speakMissMinutesTimerWarning(onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    soundFX.playMissMinutesTickTock();
    orchestralEngine.duckVolume();

    const warningText = "Tick tock, variants! Only ten seconds left!";
    const utterance = new SpeechSynthesisUtterance(warningText);
    utterance.pitch = 1.36;
    utterance.rate = 1.08;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const missMinutesVoice = voices.find(v =>
        /(samantha|victoria|zira|karen|susan|fiona|allison|ava)/i.test(v.name)
      ) || voices.find(v => /female/i.test(v.name));
      if (missMinutesVoice) utterance.voice = missMinutesVoice;
    }

    utterance.onend = () => {
      orchestralEngine.swellVolume();
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      orchestralEngine.swellVolume();
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  speakFinalConclusion(onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }
    window.speechSynthesis.cancel();
    orchestralEngine.duckVolume();
    soundFX.playTVAFilmIntroChime();

    const utterance = new SpeechSynthesisUtterance("Y'all did it! A great big thank you to all our Multiverse heroes for assembling together to save the Multiverse! For all time, always!");
    utterance.pitch = 1.30;
    utterance.rate = 1.05;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const missMinutesVoice = voices.find(v =>
        /(samantha|victoria|zira|karen|susan|fiona|allison|ava)/i.test(v.name)
      ) || voices.find(v => /female/i.test(v.name));
      if (missMinutesVoice) utterance.voice = missMinutesVoice;
    }

    utterance.onend = () => {
      orchestralEngine.stopMatchSoundtrack();
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      orchestralEngine.stopMatchSoundtrack();
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  // Speak F.R.I.D.A.Y. Tactical Telemetry Voiceover
  speakFridayLine(text: string, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // F.R.I.D.A.Y.: calm yet severe, authoritative Stark AI
    utterance.pitch = 1.05;
    utterance.rate = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const preferred = voices.find(v =>
        /irish|moira|en-IE|samantha|victoria|karen|fiona|kate|serena/i.test(v.name)
      ) || voices.find(v => /female|zira|susan/i.test(v.name));
      if (preferred) utterance.voice = preferred;
    }

    let ended = false;
    const finish = () => {
      if (ended) return;
      ended = true;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    const safety = setTimeout(finish, 8000);

    utterance.onend = () => {
      clearTimeout(safety);
      finish();
    };

    utterance.onerror = () => {
      clearTimeout(safety);
      finish();
    };

    window.speechSynthesis.speak(utterance);
  }

  stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }
}

export const voiceEngine = new VoiceSynthesisEngine();
