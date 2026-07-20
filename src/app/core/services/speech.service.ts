import { Injectable, NgZone, inject } from '@angular/core';

/**
 * Nhận diện giọng nói tiếng Trung bằng Web Speech API
 * (SpeechRecognition — miễn phí của trình duyệt, hỗ trợ tốt trên Chrome/Edge).
 */
@Injectable({ providedIn: 'root' })
export class SpeechService {
  private zone = inject(NgZone);
  private recognition: any = null;

  readonly supported: boolean;

  constructor() {
    const Ctor = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    this.supported = !!Ctor;
    if (Ctor) {
      this.recognition = new Ctor();
      this.recognition.lang = 'zh-CN';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 3;
    }
  }

  /** Nghe một lượt, trả về các phương án nhận diện (rỗng nếu không nghe được). */
  listen(): Promise<string[]> {
    if (!this.recognition) return Promise.resolve([]);
    return new Promise(resolve => {
      const rec = this.recognition;

      rec.onresult = (event: any) => {
        const alts: string[] = [];
        const result = event.results[0];
        for (let i = 0; i < result.length; i++) alts.push(result[i].transcript);
        this.zone.run(() => resolve(alts));
      };
      rec.onerror = () => this.zone.run(() => resolve([]));
      rec.onend = () => this.zone.run(() => resolve([]));

      try {
        rec.start();
      } catch {
        resolve([]);
      }
    });
  }

  stop(): void {
    try {
      this.recognition?.stop();
    } catch {
      /* ignore */
    }
  }

  /** So khớp kết quả nhận diện với hanzi mục tiêu (bỏ dấu câu, khoảng trắng). */
  matches(target: string, alternatives: string[]): boolean {
    const clean = (s: string) => s.replace(/[\s，。！？、,.!?~·]/g, '');
    const t = clean(target);
    return alternatives.some(a => {
      const c = clean(a);
      return c.includes(t) || t.includes(c) && c.length > 0;
    });
  }
}
