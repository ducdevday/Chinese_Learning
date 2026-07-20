import { Component, computed, inject, signal } from '@angular/core';
import { ProgressService } from '../../core/services/progress.service';
import { SpeechService } from '../../core/services/speech.service';
import { TtsService } from '../../core/services/tts.service';
import { VocabService } from '../../core/services/vocab.service';
import { Word } from '../../core/models';

type SpeakState = 'idle' | 'listening' | 'correct' | 'wrong';

@Component({
  selector: 'app-speaking',
  imports: [],
  templateUrl: './speaking.component.html',
  styleUrl: './speaking.component.scss',
})
export class SpeakingComponent {
  private vocab = inject(VocabService);
  private tts = inject(TtsService);
  speech = inject(SpeechService);
  progress = inject(ProgressService);

  word = signal<Word>(this.pickWord());
  sentenceMode = signal(false); // luyện cả câu ví dụ
  state = signal<SpeakState>('idle');
  heard = signal('');
  correctCount = signal(0);

  target = computed(() =>
    this.sentenceMode() && this.word().example ? this.word().example!.zh : this.word().hanzi
  );

  private pickWord(): Word {
    // ưu tiên từ đã học để luyện phát âm, chưa học từ nào thì lấy ngẫu nhiên
    const learned = this.progress.learnedSet();
    const learnedWords = this.vocab.allWords.filter(w => learned.has(w.hanzi));
    const pool = learnedWords.length >= 3 ? learnedWords : this.vocab.allWords;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  nextWord(): void {
    let next = this.pickWord();
    // tránh lặp lại từ hiện tại
    for (let i = 0; i < 5 && next.hanzi === this.word().hanzi; i++) next = this.pickWord();
    this.word.set(next);
    this.state.set('idle');
    this.heard.set('');
  }

  toggleMode(): void {
    this.sentenceMode.update(v => !v);
    this.state.set('idle');
    this.heard.set('');
  }

  playSample(): void {
    this.tts.speak(this.target());
  }

  async startListening(): Promise<void> {
    if (!this.speech.supported || this.state() === 'listening') return;
    this.state.set('listening');
    this.heard.set('');

    const alternatives = await this.speech.listen();
    if (this.state() !== 'listening') return; // đã bấm hủy/đổi từ

    this.heard.set(alternatives[0] ?? '');
    if (this.speech.matches(this.target(), alternatives)) {
      this.state.set('correct');
      this.correctCount.update(v => v + 1);
      this.progress.markLearned(this.word());
    } else {
      this.state.set('wrong');
    }
  }

  cancelListening(): void {
    this.speech.stop();
    this.state.set('idle');
  }
}
