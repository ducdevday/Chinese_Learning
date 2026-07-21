import { Unit, Word } from '../models';
import { HSK1_UNITS } from './hsk1';
import { WORD_EMOJI } from './hsk1-content';

/** Unit đặc biệt ngoài giáo trình — những câu dành riêng cho hai đứa mình 💗 */
const LOVE_UNIT: Unit = {
  id: 'u-love',
  title: 'Unit đặc biệt · Lời ngọt ngào 💗',
  subtitle: 'Ngoài giáo trình — những câu dành riêng cho hai đứa mình',
  level: 'Đặc biệt',
  emoji: '💌',
  lessons: [
    {
      id: 'b16',
      title: 'Bài 16 · Lời yêu thương',
      icon: '爱你',
      words: [
        { hanzi: '我爱你', pinyin: 'wǒ ài nǐ', meaning: 'Anh yêu em 💗', example: { zh: '我爱你，红燕！', vi: 'Anh yêu em, Hồng Yến!' } },
        { hanzi: '想你', pinyin: 'xiǎng nǐ', meaning: 'Nhớ em', example: { zh: '我很想你。', vi: 'Anh nhớ em nhiều lắm.' } },
        { hanzi: '亲爱的', pinyin: 'qīn\'ài de', meaning: 'Em yêu / anh yêu (dấu yêu)', example: { zh: '亲爱的，晚安。', vi: 'Em yêu, ngủ ngon nhé.' } },
        { hanzi: '宝贝', pinyin: 'bǎobèi', meaning: 'Bảo bối, cục cưng', example: { zh: '宝贝，加油！', vi: 'Cục cưng, cố lên!' } },
        { hanzi: '心', pinyin: 'xīn', meaning: 'Trái tim', example: { zh: '我的心里只有你。', vi: 'Trong tim anh chỉ có em.' } },
        { hanzi: '开心', pinyin: 'kāixīn', meaning: 'Vui vẻ', example: { zh: '和你在一起我很开心。', vi: 'Ở bên em anh rất vui.' } },
      ],
    },
    {
      id: 'b17',
      title: 'Bài 17 · Hẹn hò & tương lai',
      icon: '一起',
      words: [
        { hanzi: '约会', pinyin: 'yuēhuì', meaning: 'Hẹn hò', example: { zh: '周末我们去约会吧。', vi: 'Cuối tuần mình đi hẹn hò nhé.' } },
        { hanzi: '牵手', pinyin: 'qiān shǒu', meaning: 'Nắm tay', example: { zh: '我想牵你的手。', vi: 'Anh muốn nắm tay em.' } },
        { hanzi: '拥抱', pinyin: 'yōngbào', meaning: 'Ôm', example: { zh: '给我一个拥抱。', vi: 'Ôm anh một cái nào.' } },
        { hanzi: '永远', pinyin: 'yǒngyuǎn', meaning: 'Mãi mãi', example: { zh: '我永远爱你。', vi: 'Anh yêu em mãi mãi.' } },
        { hanzi: '幸福', pinyin: 'xìngfú', meaning: 'Hạnh phúc', example: { zh: '和你在一起很幸福。', vi: 'Bên em thật hạnh phúc.' } },
      ],
    },
  ],
};

export const CURRICULUM: Unit[] = [...HSK1_UNITS, LOVE_UNIT];

// Gắn hình minh họa cho từ vựng
for (const unit of CURRICULUM) {
  for (const lesson of unit.lessons) {
    for (const word of lesson.words) {
      if (!word.emoji && WORD_EMOJI[word.hanzi]) {
        word.emoji = WORD_EMOJI[word.hanzi];
      }
    }
  }
}

/** Tất cả từ vựng, loại trùng theo hanzi (từ xuất hiện ở nhiều bài chỉ tính một lần) */
export const ALL_WORDS: Word[] = (() => {
  const seen = new Set<string>();
  const words: Word[] = [];
  for (const unit of CURRICULUM) {
    for (const lesson of unit.lessons) {
      for (const word of lesson.words) {
        if (!seen.has(word.hanzi)) {
          seen.add(word.hanzi);
          words.push(word);
        }
      }
    }
  }
  return words;
})();

export const LOVE_NOTES: string[] = [
  'Hồng Yến ơi, mỗi chữ Hán em học là một bước gần hơn tới chuyến đi Trung Quốc của tụi mình đó 🧡',
  'Em học giỏi lắm, hôm nay cũng cố lên nha! 加油 (jiāyóu)! 💪',
  'Nhớ nghỉ ngơi nữa nhé, học 10 từ thôi rồi đi uống trà sữa 🧋',
  'Anh tự hào về em mỗi ngày. 你是最棒的! (Em là nhất!) 🌟',
  'Học xong bài này, tối nay mình luyện nói với nhau nha 🥰',
  'Mỗi ngày một chút thôi, kiên trì là thắng! 慢慢来 (từ từ mà tiến) 🐢',
];
