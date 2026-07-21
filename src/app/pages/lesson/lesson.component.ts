import { Component, OnDestroy, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProgressService } from '../../core/services/progress.service';
import { TtsService } from '../../core/services/tts.service';
import { VocabService } from '../../core/services/vocab.service';
import { AudioTrack, Dialogue, DialogueLine, Word } from '../../core/models';

interface ClozeQuestion {
  sentence: string; // câu đã che từ bằng ____
  vi: string;
  options: string[];
  correctIndex: number;
  word: Word;
}

@Component({
  selector: 'app-lesson',
  imports: [RouterLink],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss',
})
export class LessonComponent implements OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private vocab = inject(VocabService);
  tts = inject(TtsService);
  progress = inject(ProgressService);

  private player = new Audio();
  playingTrack = signal<string | null>(null);

  private id = toSignal(this.route.paramMap.pipe(map(p => p.get('id') ?? '')), { initialValue: '' });

  data = computed(() => this.vocab.getLesson(this.id()));

  lessonStats = computed(() => {
    const d = this.data();
    if (!d) return { done: 0, total: 0 };
    return this.progress.lessonProgress(d.lesson.words);
  });

  nextLessonId = computed(() => {
    const lessons = this.vocab.lessons;
    const i = lessons.findIndex(l => l.id === this.id());
    return i >= 0 && i < lessons.length - 1 ? lessons[i + 1].id : null;
  });

  // ===== Khởi động: ghép hình với từ (như phần 热身 của sách) =====
  warmupWords = signal<Word[]>([]); // các thẻ hình (thứ tự cố định)
  warmupChips = signal<Word[]>([]); // các chip từ (xáo trộn)
  warmupSelected = signal<string | null>(null); // hanzi của hình đang chọn
  warmupMatched = signal<Set<string>>(new Set());
  warmupWrong = signal<string | null>(null); // chip vừa chọn sai (hiệu ứng rung)

  warmupDone = computed(
    () => this.warmupWords().length > 0 && this.warmupMatched().size === this.warmupWords().length
  );

  // ===== Bài tập điền từ (sinh tự động từ ví dụ của bài) =====
  cloze = signal<ClozeQuestion[]>([]);
  clozeAnswers = signal<(number | null)[]>([]);
  clozeChecked = signal(false);

  clozeScore = computed(() => {
    const qs = this.cloze();
    const answers = this.clozeAnswers();
    return qs.filter((q, i) => answers[i] === q.correctIndex).length;
  });

  constructor() {
    this.player.addEventListener('ended', () => this.playingTrack.set(null));
    this.player.addEventListener('error', () => this.playingTrack.set(null));
    effect(() => {
      this.id(); // đổi bài thì sinh lại bài tập, dừng audio
      this.player.pause();
      this.playingTrack.set(null);
      this.buildCloze();
      this.buildWarmup();
    });
  }

  private buildWarmup(): void {
    const d = this.data();
    this.warmupSelected.set(null);
    this.warmupMatched.set(new Set());
    this.warmupWrong.set(null);
    if (!d) {
      this.warmupWords.set([]);
      this.warmupChips.set([]);
      return;
    }
    const withEmoji = d.lesson.words.filter(w => w.emoji);
    const picked = [...withEmoji].sort(() => Math.random() - 0.5).slice(0, 6);
    this.warmupWords.set(picked);
    this.warmupChips.set([...picked].sort(() => Math.random() - 0.5));
  }

  pickWarmupImage(word: Word): void {
    if (this.warmupMatched().has(word.hanzi)) return;
    this.warmupSelected.set(word.hanzi);
    this.tts.speak(word.hanzi);
  }

  pickWarmupChip(word: Word): void {
    const selected = this.warmupSelected();
    if (!selected || this.warmupMatched().has(word.hanzi)) return;
    if (word.hanzi === selected) {
      this.warmupMatched.update(set => new Set(set).add(word.hanzi));
      this.warmupSelected.set(null);
    } else {
      this.warmupWrong.set(word.hanzi);
      setTimeout(() => this.warmupWrong.set(null), 450);
    }
  }

  resetWarmup(): void {
    this.buildWarmup();
  }

  ngOnDestroy(): void {
    this.player.pause();
    this.player.src = '';
  }

  private buildCloze(): void {
    const d = this.data();
    this.clozeChecked.set(false);
    if (!d) {
      this.cloze.set([]);
      return;
    }
    const candidates = d.lesson.words.filter(
      w => w.example && w.example.zh.includes(w.hanzi) && w.example.zh.length > w.hanzi.length
    );
    const picked = [...candidates].sort(() => Math.random() - 0.5).slice(0, 5);
    const questions = picked.map(word => {
      const distractors = [...d.lesson.words]
        .filter(w => w.hanzi !== word.hanzi)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.hanzi);
      const options = [...distractors, word.hanzi].sort(() => Math.random() - 0.5);
      return {
        sentence: word.example!.zh.replace(word.hanzi, '____'),
        vi: word.example!.vi,
        options,
        correctIndex: options.indexOf(word.hanzi),
        word,
      };
    });
    this.cloze.set(questions);
    this.clozeAnswers.set(questions.map(() => null));
  }

  pickCloze(qIndex: number, optIndex: number): void {
    if (this.clozeChecked()) return;
    this.clozeAnswers.update(arr => {
      const next = [...arr];
      next[qIndex] = optIndex;
      return next;
    });
  }

  checkCloze(): void {
    this.clozeChecked.set(true);
    this.cloze().forEach((q, i) => {
      if (this.clozeAnswers()[i] === q.correctIndex) this.progress.markLearned(q.word);
    });
  }

  retryCloze(): void {
    this.buildCloze();
  }

  // ===== Audio giáo trình =====
  toggleTrack(track: AudioTrack): void {
    if (this.playingTrack() === track.file) {
      this.player.pause();
      this.playingTrack.set(null);
      return;
    }
    this.player.src = track.file;
    this.player.play().catch(() => this.playingTrack.set(null));
    this.playingTrack.set(track.file);
  }

  // ===== Phát âm =====
  speak(word: Word): void {
    this.tts.speak(word.hanzi);
  }

  speakExample(word: Word): void {
    if (word.example) this.tts.speak(word.example.zh);
  }

  speakLine(line: DialogueLine): void {
    this.tts.speak(line.zh);
  }

  speakDialogue(dialogue: Dialogue): void {
    this.tts.speak(dialogue.lines.map(l => l.zh).join('，'));
  }

  toggleLearned(word: Word): void {
    if (this.progress.isLearned(word)) {
      this.progress.unmarkLearned(word);
    } else {
      this.progress.markLearned(word);
    }
  }

  goQuiz(): void {
    this.router.navigate(['/quiz'], { queryParams: { lesson: this.id() } });
  }

  goFlashcards(): void {
    this.router.navigate(['/flashcard'], { queryParams: { lesson: this.id() } });
  }
}
