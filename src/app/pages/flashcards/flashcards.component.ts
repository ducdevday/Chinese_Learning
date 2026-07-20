import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProgressService } from '../../core/services/progress.service';
import { TtsService } from '../../core/services/tts.service';
import { VocabService } from '../../core/services/vocab.service';
import { Word } from '../../core/models';

@Component({
  selector: 'app-flashcards',
  imports: [RouterLink],
  templateUrl: './flashcards.component.html',
  styleUrl: './flashcards.component.scss',
})
export class FlashcardsComponent {
  private route = inject(ActivatedRoute);
  private vocab = inject(VocabService);
  private tts = inject(TtsService);
  private progress = inject(ProgressService);

  deck = signal<Word[]>([]);
  index = signal(0);
  flipped = signal(false);
  knownCount = signal(0);
  finished = signal(false);
  deckLabel = signal('');
  reviewMode = signal(false); // chế độ ôn tập SRS

  current = computed(() => this.deck()[this.index()]);
  percent = computed(() => this.deck().length ? Math.round((this.index() / this.deck().length) * 100) : 0);

  constructor() {
    const params = this.route.snapshot.queryParamMap;
    const lessonId = params.get('lesson');
    if (params.get('mode') === 'on-tap') {
      this.startReviewDeck();
      return;
    }
    if (lessonId) {
      const data = this.vocab.getLesson(lessonId);
      if (data) {
        this.startDeck(data.lesson.words, data.lesson.title);
        return;
      }
    }
    this.pickSmartDeck();
  }

  /** Bộ thẻ ôn tập SRS: các từ đến hạn ôn hôm nay */
  private startReviewDeck(): void {
    const due = new Set(this.progress.dueWords());
    const words = this.vocab.allWords.filter(w => due.has(w.hanzi));
    if (!words.length) {
      this.pickSmartDeck();
      return;
    }
    this.reviewMode.set(true);
    this.startDeck(words, `Ôn tập hôm nay · ${words.length} từ đến hạn 🔁`);
  }

  /** Ưu tiên từ chưa thuộc, trộn thêm vài từ đã thuộc để ôn lại */
  private pickSmartDeck(): void {
    this.reviewMode.set(false);
    const learned = this.progress.learnedSet();
    const fresh = this.vocab.allWords.filter(w => !learned.has(w.hanzi));
    const review = this.vocab.allWords.filter(w => learned.has(w.hanzi));
    const deck = [
      ...fresh.sort(() => Math.random() - 0.5).slice(0, 8),
      ...review.sort(() => Math.random() - 0.5).slice(0, 4),
    ].sort(() => Math.random() - 0.5);
    this.startDeck(deck.length ? deck : this.vocab.allWords.slice(0, 10), 'Bộ thẻ hôm nay');
  }

  private startDeck(words: Word[], label: string): void {
    this.deck.set([...words].sort(() => Math.random() - 0.5));
    this.deckLabel.set(label);
    this.index.set(0);
    this.flipped.set(false);
    this.knownCount.set(0);
    this.finished.set(false);
  }

  flip(): void {
    this.flipped.update(v => !v);
    if (this.flipped()) this.tts.speak(this.current().hanzi);
  }

  speak(event: Event): void {
    event.stopPropagation();
    this.tts.speak(this.current().hanzi);
  }

  answer(known: boolean): void {
    if (this.reviewMode()) {
      // SRS: nhớ → giãn lịch ôn, quên → ôn lại ngày mai
      this.progress.review(this.current().hanzi, known);
      if (known) this.knownCount.update(v => v + 1);
    } else if (known) {
      this.progress.markLearned(this.current());
      this.knownCount.update(v => v + 1);
    }
    if (this.index() >= this.deck().length - 1) {
      this.finished.set(true);
    } else {
      this.flipped.set(false);
      this.index.update(v => v + 1);
    }
  }

  restart(): void {
    if (this.reviewMode()) {
      this.startReviewDeck();
    } else {
      this.pickSmartDeck();
    }
  }
}
