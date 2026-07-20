import { Injectable } from '@angular/core';

/** Phát âm tiếng Trung bằng Web Speech API (giọng zh-CN của trình duyệt). */
@Injectable({ providedIn: 'root' })
export class TtsService {
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    if ('speechSynthesis' in window) {
      speechSynthesis.addEventListener('voiceschanged', () => this.pickVoice());
      this.pickVoice();
    }
  }

  private pickVoice(): void {
    const voices = speechSynthesis.getVoices();
    this.voice =
      voices.find(v => v.lang === 'zh-CN') ??
      voices.find(v => v.lang.startsWith('zh')) ??
      null;
  }

  speak(text: string, rate = 0.85): void {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'zh-CN';
    utter.rate = rate;
    if (this.voice) utter.voice = this.voice;
    speechSynthesis.speak(utter);
  }
}
