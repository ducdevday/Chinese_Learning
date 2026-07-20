export interface Word {
  hanzi: string;
  pinyin: string;
  meaning: string;
  example?: { zh: string; vi: string };
}

export interface Lesson {
  id: string;
  title: string;
  icon: string; // hanzi hiển thị trên thẻ bài học
  words: Word[];
}

export interface Unit {
  id: string;
  title: string;
  subtitle: string;
  level: string;
  emoji: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  prompt: string;
  promptHint?: string;
  promptIsHanzi: boolean;
  options: string[];
  optionsAreHanzi: boolean;
  correctIndex: number;
  word: Word;
}
