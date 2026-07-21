export interface Word {
  hanzi: string;
  pinyin: string;
  meaning: string;
  /** từ loại: dt., đgt., tt., số., lượng., phó., trợ., đtnn., ct., giới., liên. */
  pos?: string;
  /** hình minh họa cho từ (dùng cho phần khởi động nhìn hình đoán từ) */
  emoji?: string;
  example?: { zh: string; vi: string };
}

export interface AudioTrack {
  label: string;
  file: string; // đường dẫn trong public/, vd: audio/hsk1/01-1.mp3
}

export interface DialogueLine {
  speaker: string; // 'A' | 'B'
  zh: string;
  pinyin: string;
  vi: string;
}

export interface Dialogue {
  title: string; // bối cảnh hội thoại
  lines: DialogueLine[];
}

export interface GrammarPoint {
  title: string;
  explanation: string;
  examples: { zh: string; vi: string }[];
}

export interface Lesson {
  id: string;
  title: string;
  icon: string; // hanzi hiển thị trên thẻ bài học
  words: Word[];
  audio?: AudioTrack[]; // file nghe của giáo trình, theo thứ tự track
  bookPage?: number; // trang trong sách giáo khoa
  dialogues?: Dialogue[]; // hội thoại luyện tập (tự soạn theo chủ đề bài)
  grammar?: GrammarPoint[]; // chú thích ngữ pháp của bài
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
