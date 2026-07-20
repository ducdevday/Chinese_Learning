import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProgressService } from '../../core/services/progress.service';
import { TtsService } from '../../core/services/tts.service';
import { VocabService } from '../../core/services/vocab.service';
import { QuizQuestion } from '../../core/models';

@Component({
  selector: 'app-quiz',
  imports: [RouterLink],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  private route = inject(ActivatedRoute);
  private vocab = inject(VocabService);
  private tts = inject(TtsService);
  progress = inject(ProgressService);

  questions = signal<QuizQuestion[]>([]);
  index = signal(0);
  selected = signal<number | null>(null);
  score = signal(0);
  finished = signal(false);
  quizLabel = signal('Quiz nhanh · 5 câu');

  current = computed(() => this.questions()[this.index()]);
  percent = computed(() => Math.round((this.index() / (this.questions().length || 1)) * 100));
  scorePercent = computed(() =>
    this.questions().length ? Math.round((this.score() / this.questions().length) * 100) : 0
  );

  verdict = computed(() => {
    const p = this.scorePercent();
    if (p === 100) return 'Tuyệt đối luôn! Em là số một! 🏆💗';
    if (p >= 80) return 'Giỏi quá trời! Sắp thành cao thủ rồi 🌟';
    if (p >= 60) return 'Khá lắm nè, ôn thêm chút là ngon 💪';
    return 'Không sao đâu em, học lại cùng anh nha 🥰';
  });

  constructor() {
    this.start();
  }

  start(): void {
    const lessonId = this.route.snapshot.queryParamMap.get('lesson');
    let pool = this.vocab.allWords;
    if (lessonId) {
      const data = this.vocab.getLesson(lessonId);
      if (data) {
        pool = data.lesson.words;
        this.quizLabel.set(`Quiz · ${data.lesson.title}`);
      }
    } else {
      // ưu tiên từ đã học để ôn tập, nếu chưa học đủ thì lấy tất cả
      const learned = this.progress.learnedSet();
      const learnedWords = this.vocab.allWords.filter(w => learned.has(w.hanzi));
      if (learnedWords.length >= 5) pool = learnedWords;
    }
    this.questions.set(this.vocab.buildQuiz(pool, 5));
    this.index.set(0);
    this.selected.set(null);
    this.score.set(0);
    this.finished.set(false);
  }

  choose(i: number): void {
    if (this.selected() !== null) return;
    this.selected.set(i);
    const q = this.current();
    if (i === q.correctIndex) this.score.update(v => v + 1);
    this.tts.speak(q.word.hanzi);
  }

  next(): void {
    if (this.index() >= this.questions().length - 1) {
      this.finished.set(true);
      this.progress.recordQuizScore(this.scorePercent());
    } else {
      this.selected.set(null);
      this.index.update(v => v + 1);
    }
  }
}
