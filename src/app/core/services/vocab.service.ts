import { Injectable } from '@angular/core';
import { ALL_WORDS, CURRICULUM } from '../data/curriculum';
import { Lesson, QuizQuestion, Unit, Word } from '../models';

@Injectable({ providedIn: 'root' })
export class VocabService {
  readonly units: Unit[] = CURRICULUM;
  readonly allWords: Word[] = ALL_WORDS;

  getLesson(id: string): { lesson: Lesson; unit: Unit } | undefined {
    for (const unit of this.units) {
      const lesson = unit.lessons.find(l => l.id === id);
      if (lesson) return { lesson, unit };
    }
    return undefined;
  }

  get lessons(): Lesson[] {
    return this.units.flatMap(u => u.lessons);
  }

  /** Từ của ngày — chọn ổn định theo ngày */
  wordOfDay(): Word {
    const today = new Date();
    const seed = today.getFullYear() * 372 + today.getMonth() * 31 + today.getDate();
    return this.allWords[seed % this.allWords.length];
  }

  /** Sinh bài luyện nghe: nghe phát âm rồi chọn chữ Hán hoặc nghĩa */
  buildListeningQuiz(pool: Word[], count = 8): QuizQuestion[] {
    const source = pool.length >= 4 ? pool : this.allWords;
    const shuffled = [...source].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, Math.min(count, shuffled.length));

    return picked.map(word => {
      const toHanzi = Math.random() < 0.6; // 60% nghe→chữ Hán, 40% nghe→nghĩa
      const distractors = [...this.allWords]
        .filter(w => w.hanzi !== word.hanzi)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const options = [...distractors, word].sort(() => Math.random() - 0.5);

      return {
        prompt: '🔊',
        promptHint: toHanzi ? 'Nghe rồi chọn chữ Hán đúng' : 'Nghe rồi chọn nghĩa đúng',
        promptIsHanzi: false,
        options: options.map(o => (toHanzi ? `${o.hanzi} · ${o.pinyin}` : o.meaning)),
        optionsAreHanzi: toHanzi,
        correctIndex: options.indexOf(word),
        word,
      };
    });
  }

  /** Sinh câu hỏi trắc nghiệm từ một tập từ vựng */
  buildQuiz(pool: Word[], count = 5): QuizQuestion[] {
    const source = pool.length >= 4 ? pool : this.allWords;
    const shuffled = [...source].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, Math.min(count, shuffled.length));

    return picked.map(word => {
      const mode = Math.floor(Math.random() * 3); // 0: hán→nghĩa, 1: nghĩa→hán, 2: pinyin→nghĩa
      const distractors = [...this.allWords]
        .filter(w => w.hanzi !== word.hanzi)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const options = [...distractors, word].sort(() => Math.random() - 0.5);

      if (mode === 1) {
        return {
          prompt: word.meaning,
          promptHint: 'Chọn chữ Hán đúng',
          promptIsHanzi: false,
          options: options.map(o => o.hanzi),
          optionsAreHanzi: true,
          correctIndex: options.indexOf(word),
          word,
        };
      }
      if (mode === 2) {
        return {
          prompt: word.pinyin,
          promptHint: 'Pinyin này nghĩa là gì?',
          promptIsHanzi: false,
          options: options.map(o => o.meaning),
          optionsAreHanzi: false,
          correctIndex: options.indexOf(word),
          word,
        };
      }
      return {
        prompt: word.hanzi,
        promptHint: 'Chữ này nghĩa là gì?',
        promptIsHanzi: true,
        options: options.map(o => o.meaning),
        optionsAreHanzi: false,
        correctIndex: options.indexOf(word),
        word,
      };
    });
  }
}
