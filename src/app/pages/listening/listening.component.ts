import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../core/services/progress.service';
import { TtsService } from '../../core/services/tts.service';
import { VocabService } from '../../core/services/vocab.service';
import { QuizQuestion } from '../../core/models';

@Component({
  selector: 'app-listening',
  imports: [RouterLink],
  templateUrl: './listening.component.html',
  styleUrl: './listening.component.scss',
})
export class ListeningComponent {
  private vocab = inject(VocabService);
  private tts = inject(TtsService);
  private progress = inject(ProgressService);

  questions = signal<QuizQuestion[]>([]);
  index = signal(0);
  selected = signal<number | null>(null);
  score = signal(0);
  finished = signal(false);

  current = computed(() => this.questions()[this.index()]);
  percent = computed(() => Math.round((this.index() / (this.questions().length || 1)) * 100));
  scorePercent = computed(() =>
    this.questions().length ? Math.round((this.score() / this.questions().length) * 100) : 0
  );

  verdict = computed(() => {
    const p = this.scorePercent();
    if (p === 100) return 'Đôi tai vàng của anh đây rồi! 🏆💗';
    if (p >= 75) return 'Nghe chuẩn lắm luôn! 🌟';
    if (p >= 50) return 'Khá lắm nè, nghe thêm chút nữa là ngon 💪';
    return 'Không sao đâu, nghe nhiều sẽ quen tai à 🥰';
  });

  constructor() {
    this.start();
  }

  start(): void {
    // ưu tiên ôn các từ đã học, chưa đủ thì lấy tất cả
    const learned = this.progress.learnedSet();
    const learnedWords = this.vocab.allWords.filter(w => learned.has(w.hanzi));
    const pool = learnedWords.length >= 8 ? learnedWords : this.vocab.allWords;
    this.questions.set(this.vocab.buildListeningQuiz(pool, 8));
    this.index.set(0);
    this.selected.set(null);
    this.score.set(0);
    this.finished.set(false);
    setTimeout(() => this.play(), 400);
  }

  play(): void {
    const q = this.current();
    if (q) this.tts.speak(q.word.hanzi);
  }

  choose(i: number): void {
    if (this.selected() !== null) return;
    this.selected.set(i);
    if (i === this.current().correctIndex) this.score.update(v => v + 1);
  }

  next(): void {
    if (this.index() >= this.questions().length - 1) {
      this.finished.set(true);
    } else {
      this.selected.set(null);
      this.index.update(v => v + 1);
      setTimeout(() => this.play(), 250);
    }
  }
}
