import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import HanziWriter from 'hanzi-writer';
import { TtsService } from '../../core/services/tts.service';
import { VocabService } from '../../core/services/vocab.service';
import { Word } from '../../core/models';

/**
 * Luyện viết chữ Hán bằng chuột/cảm ứng.
 * Dữ liệu nét chữ tải từ CDN công khai của hanzi-writer (jsdelivr).
 */
@Component({
  selector: 'app-writing',
  imports: [],
  templateUrl: './writing.component.html',
  styleUrl: './writing.component.scss',
})
export class WritingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('target') target!: ElementRef<HTMLDivElement>;

  private vocab = inject(VocabService);
  private tts = inject(TtsService);
  private writer: HanziWriter | null = null;

  // chỉ các từ 1-2 ký tự cho dễ luyện, tách từng ký tự
  chars: { char: string; word: Word }[] = this.buildCharList();
  selected = signal(this.chars[0]);
  charIndex = signal(0); // vị trí ký tự trong từ nhiều chữ
  status = signal<'idle' | 'animating' | 'quiz' | 'done'>('idle');
  message = signal('Bấm "Xem cách viết" để coi thứ tự nét, rồi "Tự viết" để luyện nha em ✍️');
  loadError = signal(false);

  private buildCharList(): { char: string; word: Word }[] {
    const seen = new Set<string>();
    const list: { char: string; word: Word }[] = [];
    for (const word of this.vocab.allWords) {
      const chars = [...word.hanzi].filter(c => /\p{Script=Han}/u.test(c));
      if (chars.length === 1 && !seen.has(chars[0])) {
        seen.add(chars[0]);
        list.push({ char: chars[0], word });
      }
    }
    return list;
  }

  ngAfterViewInit(): void {
    this.createWriter(this.selected().char);
  }

  ngOnDestroy(): void {
    this.writer = null;
  }

  private createWriter(char: string): void {
    this.target.nativeElement.innerHTML = '';
    this.loadError.set(false);
    this.writer = HanziWriter.create(this.target.nativeElement, char, {
      width: 280,
      height: 280,
      padding: 16,
      strokeColor: '#e0447e',
      radicalColor: '#a62154',
      outlineColor: '#f8c8dd',
      drawingColor: '#cb2e69',
      drawingWidth: 18,
      showCharacter: true,
      showOutline: true,
      onLoadCharDataError: () => {
        this.loadError.set(true);
        this.message.set('Không tải được dữ liệu nét chữ (cần mạng internet) 😢');
      },
    });
  }

  pick(item: { char: string; word: Word }): void {
    this.selected.set(item);
    this.status.set('idle');
    this.message.set(`"${item.char}" (${item.word.pinyin}) — ${item.word.meaning}`);
    this.createWriter(item.char);
    this.tts.speak(item.char);
  }

  animate(): void {
    if (!this.writer) return;
    this.status.set('animating');
    this.message.set('Nhìn kỹ thứ tự nét nha em 👀');
    this.writer.animateCharacter({
      onComplete: () => {
        this.status.set('idle');
        this.message.set('Giờ thử tự viết xem nào! ✍️');
      },
    });
  }

  startQuiz(): void {
    if (!this.writer) return;
    this.status.set('quiz');
    this.message.set('Dùng chuột vẽ từng nét theo đúng thứ tự nhé!');
    this.writer.quiz({
      onMistake: () => this.message.set('Chưa đúng nét đó, thử lại nha 😉'),
      onCorrectStroke: (info: { strokeNum: number; strokesRemaining: number }) => {
        if (info.strokesRemaining > 0) {
          this.message.set(`Đúng rồi! Còn ${info.strokesRemaining} nét nữa 💪`);
        }
      },
      onComplete: () => {
        this.status.set('done');
        this.message.set(`Tuyệt vời! Em viết được chữ "${this.selected().char}" rồi đó! 🎉💗`);
        this.tts.speak(this.selected().char);
      },
    });
  }

  speak(): void {
    this.tts.speak(this.selected().char);
  }
}
