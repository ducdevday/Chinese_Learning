import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressService } from '../../core/services/progress.service';
import { VocabService } from '../../core/services/vocab.service';
import { Lesson } from '../../core/models';

@Component({
  selector: 'app-roadmap',
  imports: [RouterLink],
  templateUrl: './roadmap.component.html',
  styleUrl: './roadmap.component.scss',
})
export class RoadmapComponent {
  vocab = inject(VocabService);
  progress = inject(ProgressService);

  lessonPercent(lesson: Lesson): number {
    const { done, total } = this.progress.lessonProgress(lesson.words);
    return Math.round((done / total) * 100);
  }

  lessonDone(lesson: Lesson): number {
    return this.progress.lessonProgress(lesson.words).done;
  }
}
