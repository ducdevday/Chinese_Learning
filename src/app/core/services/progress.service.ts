import { Injectable, computed, signal } from '@angular/core';
import { Word } from '../models';

interface SrsEntry {
  level: number; // 0..4, quyết định khoảng cách ôn
  due: string; // yyyy-mm-dd
}

interface ProgressState {
  learned: string[]; // danh sách hanzi đã học
  srs: Record<string, SrsEntry>; // lịch ôn tập ngắt quãng theo hanzi
  streak: number;
  lastStudyDate: string; // yyyy-mm-dd
  todayDate: string;
  todayCount: number;
  quizBest: number; // % điểm quiz cao nhất
}

const KEY = 'hy-progress';

/** Khoảng cách ôn (ngày) theo level */
const SRS_INTERVALS = [1, 3, 7, 14, 30];

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(days: number): string {
  return new Date(Date.now() + days * 86400000).toISOString().slice(0, 10);
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private state = signal<ProgressState>(this.load());

  readonly learnedSet = computed(() => new Set(this.state().learned));
  readonly learnedCount = computed(() => this.state().learned.length);
  readonly streak = computed(() => this.state().streak);
  readonly quizBest = computed(() => this.state().quizBest);
  readonly todayCount = computed(() => {
    const s = this.state();
    return s.todayDate === todayStr() ? s.todayCount : 0;
  });

  /** Các hanzi đã đến hạn ôn hôm nay */
  readonly dueWords = computed(() => {
    const today = todayStr();
    const srs = this.state().srs;
    return Object.keys(srs).filter(h => srs[h].due <= today);
  });

  private load(): ProgressState {
    const base: ProgressState = {
      learned: [],
      srs: {},
      streak: 0,
      lastStudyDate: '',
      todayDate: todayStr(),
      todayCount: 0,
      quizBest: 0,
    };
    try {
      const raw = localStorage.getItem(KEY);
      const state: ProgressState = raw ? { ...base, ...JSON.parse(raw) } : base;
      // migration: từ đã học trước khi có SRS thì đưa vào lịch ôn ngay hôm nay
      let migrated = false;
      for (const hanzi of state.learned) {
        if (!state.srs[hanzi]) {
          state.srs[hanzi] = { level: 1, due: todayStr() };
          migrated = true;
        }
      }
      if (migrated) localStorage.setItem(KEY, JSON.stringify(state));
      return state;
    } catch {
      return base;
    }
  }

  private save(next: ProgressState): void {
    this.state.set(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  isLearned(word: Word): boolean {
    return this.learnedSet().has(word.hanzi);
  }

  /** Đánh dấu đã học một từ; cập nhật mục tiêu ngày + chuỗi ngày liên tục + lịch ôn. */
  markLearned(word: Word): void {
    const s = this.state();
    if (s.learned.includes(word.hanzi)) return;

    const today = todayStr();
    let { streak, lastStudyDate } = s;
    if (lastStudyDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      streak = lastStudyDate === yesterday ? streak + 1 : 1;
      lastStudyDate = today;
    }

    this.save({
      ...s,
      learned: [...s.learned, word.hanzi],
      srs: { ...s.srs, [word.hanzi]: { level: 0, due: addDays(1) } },
      streak,
      lastStudyDate,
      todayDate: today,
      todayCount: (s.todayDate === today ? s.todayCount : 0) + 1,
    });
  }

  unmarkLearned(word: Word): void {
    const s = this.state();
    if (!s.learned.includes(word.hanzi)) return;
    const srs = { ...s.srs };
    delete srs[word.hanzi];
    this.save({ ...s, learned: s.learned.filter(h => h !== word.hanzi), srs });
  }

  /** Ôn tập SRS: nhớ → giãn lịch ôn, quên → ôn lại từ đầu (ngày mai). */
  review(hanzi: string, remembered: boolean): void {
    const s = this.state();
    const entry = s.srs[hanzi] ?? { level: 0, due: todayStr() };
    const next: SrsEntry = remembered
      ? {
          level: Math.min(entry.level + 1, SRS_INTERVALS.length - 1),
          due: addDays(SRS_INTERVALS[Math.min(entry.level + 1, SRS_INTERVALS.length - 1)]),
        }
      : { level: 0, due: addDays(1) };
    this.save({ ...s, srs: { ...s.srs, [hanzi]: next } });
  }

  recordQuizScore(percent: number): void {
    const s = this.state();
    if (percent > s.quizBest) this.save({ ...s, quizBest: percent });
  }

  lessonProgress(words: Word[]): { done: number; total: number } {
    const set = this.learnedSet();
    return { done: words.filter(w => set.has(w.hanzi)).length, total: words.length };
  }
}
