import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LOVE_NOTES } from '../../core/data/curriculum';
import { ProgressService } from '../../core/services/progress.service';
import { SettingsService } from '../../core/services/settings.service';
import { TtsService } from '../../core/services/tts.service';
import { VocabService } from '../../core/services/vocab.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private vocab = inject(VocabService);
  private tts = inject(TtsService);
  progress = inject(ProgressService);
  settings = inject(SettingsService).settings;

  wordOfDay = this.vocab.wordOfDay();

  todayLabel = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric',
  });

  greeting = computed(() => {
    const h = new Date().getHours();
    if (h < 11) return 'Chào buổi sáng';
    if (h < 13) return 'Chào buổi trưa';
    if (h < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  });

  loveNote = LOVE_NOTES[new Date().getDate() % LOVE_NOTES.length];

  goalPercent = computed(() => {
    const goal = this.settings().dailyGoal || 1;
    return Math.min(100, Math.round((this.progress.todayCount() / goal) * 100));
  });

  remaining = computed(() => Math.max(0, this.settings().dailyGoal - this.progress.todayCount()));

  /** Bài học tiếp theo: bài đầu tiên chưa hoàn thành */
  nextLesson = computed(() => {
    const set = this.progress.learnedSet();
    for (const unit of this.vocab.units) {
      for (const lesson of unit.lessons) {
        const done = lesson.words.filter(w => set.has(w.hanzi)).length;
        if (done < lesson.words.length) {
          return { lesson, unit, done, left: lesson.words.length - done };
        }
      }
    }
    const lastUnit = this.vocab.units[this.vocab.units.length - 1];
    const lesson = lastUnit.lessons[lastUnit.lessons.length - 1];
    return { lesson, unit: lastUnit, done: lesson.words.length, left: 0 };
  });

  speakWordOfDay(): void {
    this.tts.speak(this.wordOfDay.hanzi);
  }
}
