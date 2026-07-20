import { Injectable } from '@angular/core';

/**
 * Phát âm tiếng Trung bằng Web Speech API (giọng zh-CN của trình duyệt).
 *
 * Lưu ý các bug đã biết của Chrome mà service này phải né:
 * - cancel() gọi ngay trước speak() thỉnh thoảng "nuốt" luôn utterance mới
 *   → chỉ cancel khi đang phát, và đợi một nhịp trước khi speak lại.
 * - Utterance không được giữ tham chiếu có thể bị garbage-collect giữa chừng
 *   → giữ trong this.current cho tới khi phát xong.
 * - Engine có thể kẹt ở trạng thái paused sau khi tab mất focus
 *   → luôn resume() trước khi phát; nếu 400ms sau vẫn chưa kêu thì thử lại 1 lần.
 */
@Injectable({ providedIn: 'root' })
export class TtsService {
  private voice: SpeechSynthesisVoice | null = null;
  private current: SpeechSynthesisUtterance | null = null;
  private pendingTimer: ReturnType<typeof setTimeout> | null = null;
  private gestureRetry: { text: string; rate: number } | null = null;
  private gestureListenerArmed = false;

  readonly supported = 'speechSynthesis' in window;

  constructor() {
    if (this.supported) {
      speechSynthesis.addEventListener('voiceschanged', () => this.pickVoice());
      this.pickVoice();
      // warm-up: một số máy chỉ nạp danh sách giọng sau lần gọi getVoices() đầu tiên
      speechSynthesis.getVoices();
    }
  }

  private pickVoice(): void {
    const voices = speechSynthesis.getVoices();
    this.voice =
      voices.find(v => v.lang === 'zh-CN' && v.localService) ??
      voices.find(v => v.lang === 'zh-CN') ??
      voices.find(v => v.lang.replace('_', '-').startsWith('zh')) ??
      null;
  }

  speak(text: string, rate = 0.85): void {
    if (!this.supported) return;

    if (this.pendingTimer) {
      clearTimeout(this.pendingTimer);
      this.pendingTimer = null;
    }

    const start = () => {
      this.pendingTimer = null;
      speechSynthesis.resume(); // gỡ trạng thái paused bị kẹt
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'zh-CN';
      utter.rate = rate;
      if (!this.voice) this.pickVoice();
      if (this.voice) utter.voice = this.voice;
      utter.onend = () => {
        if (this.current === utter) this.current = null;
      };
      utter.onerror = (e: SpeechSynthesisErrorEvent) => {
        if (this.current === utter) this.current = null;
        // autoplay bị chặn vì trang chưa có tương tác → phát lại ở cú chạm đầu tiên
        if (e.error === 'not-allowed') this.armGestureRetry(text, rate);
      };
      this.current = utter; // giữ tham chiếu tránh GC
      speechSynthesis.speak(utter);

      // watchdog: nếu sau 400ms vẫn chưa bắt đầu phát thì reset engine và thử lại 1 lần
      setTimeout(() => {
        if (this.current === utter && !speechSynthesis.speaking && !speechSynthesis.pending) {
          speechSynthesis.cancel();
          speechSynthesis.resume();
          speechSynthesis.speak(utter);
        }
      }, 400);
    };

    this.gestureRetry = null; // lần speak mới thay thế lần bị chặn trước đó

    if (speechSynthesis.speaking || speechSynthesis.pending) {
      // cancel + speak liền nhau bị Chrome nuốt tiếng → đợi engine dọn xong đã
      speechSynthesis.cancel();
      this.pendingTimer = setTimeout(start, 100);
    } else {
      start();
    }
  }

  private armGestureRetry(text: string, rate: number): void {
    this.gestureRetry = { text, rate };
    if (this.gestureListenerArmed) return;
    this.gestureListenerArmed = true;
    const handler = () => {
      document.removeEventListener('pointerdown', handler, true);
      this.gestureListenerArmed = false;
      const retry = this.gestureRetry;
      this.gestureRetry = null;
      // đợi một nhịp để click handler (nếu có) chạy trước; speak mới sẽ tự hủy retry này
      if (retry) setTimeout(() => this.speak(retry.text, retry.rate), 120);
    };
    document.addEventListener('pointerdown', handler, true);
  }
}
