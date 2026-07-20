import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProgressService } from '../../core/services/progress.service';
import { TtsService } from '../../core/services/tts.service';
import { VocabService } from '../../core/services/vocab.service';
import { Word } from '../../core/models';

@Component({
  selector: 'app-lesson',
  imports: [RouterLink],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss',
})
export class LessonComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private vocab = inject(VocabService);
  private tts = inject(TtsService);
  progress = inject(ProgressService);

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

  speak(word: Word): void {
    this.tts.speak(word.hanzi);
  }

  speakExample(word: Word): void {
    if (word.example) this.tts.speak(word.example.zh);
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
