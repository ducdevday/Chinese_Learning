import { Dialogue, GrammarPoint } from '../models';

/** Hình minh họa cho từ vựng — dùng ở danh sách từ, flashcard và trò chơi khởi động */
export const WORD_EMOJI: Record<string, string> = {
  // Bài 1-2
  '好': '👍', '您': '🙇', '你们': '👥', '对不起': '😔', '没关系': '🤗',
  '谢谢': '🙏', '再见': '👋',
  // Bài 3-4
  '名字': '📛', '老师': '👩‍🏫', '学生': '🧑‍🎓', '人': '🧍', '中国': '🇨🇳', '美国': '🇺🇸',
  '她': '👩', '他': '👨', '谁': '🤔', '国': '🌍', '同学': '🧑‍🤝‍🧑', '朋友': '👫', '汉语': '🀄',
  // Bài 5
  '家': '🏠', '女儿': '👧', '岁': '🎂', '今年': '📅',
  '一': '1️⃣', '二': '2️⃣', '三': '3️⃣', '四': '4️⃣', '五': '5️⃣',
  '六': '6️⃣', '七': '7️⃣', '八': '8️⃣', '九': '9️⃣', '十': '🔟',
  // Bài 6-7
  '说': '🗣️', '妈妈': '👩‍👧', '菜': '🥘', '好吃': '😋', '做': '👨‍🍳', '写': '✍️',
  '汉字': '🖌️', '字': '🔤', '读': '📖',
  '今天': '📆', '月': '🌙', '星期': '🗓️', '昨天': '🌇', '明天': '🌅',
  '去': '🚶', '学校': '🏫', '看': '👀', '书': '📚',
  // Bài 8
  '想': '💭', '喝': '🥤', '茶': '🍵', '吃': '🍽️', '米饭': '🍚', '下午': '🌤️',
  '商店': '🏪', '买': '🛒', '杯子': '🥛', '钱': '💰', '块': '💴',
  // Bài 9-10
  '小': '🤏', '猫': '🐱', '狗': '🐶', '椅子': '🪑', '下': '⬇️', '工作': '💼',
  '儿子': '👦', '医院': '🏥', '医生': '🧑‍⚕️', '爸爸': '👨‍👧',
  '上': '⬆️', '电脑': '💻', '本': '📓', '里': '📦', '前面': '🔜', '后面': '🔙',
  '没有': '🚫', '坐': '💺',
  // Bài 11
  '现在': '⏰', '点': '🕐', '分': '⏱️', '中午': '🌞', '吃饭': '🍜', '时候': '⏳',
  '回': '↩️', '我们': '👨‍👩‍👧', '电影': '🎬', '住': '🏡', '北京': '🏯',
  // Bài 12-13
  '天气': '⛅', '热': '🥵', '冷': '🥶', '下雨': '🌧️', '小姐': '👩‍🦰',
  '身体': '💪', '爱': '❤️', '水果': '🍉', '水': '💧',
  '喂': '📞', '学习': '🎓', '上午': '🌄', '睡觉': '😴', '电视': '📺',
  '喜欢': '💕', '给': '🎁', '打电话': '📱',
  // Bài 14-15
  '东西': '🛍️', '一点儿': '🤏', '苹果': '🍎', '看见': '🔍', '先生': '🤵',
  '开': '🚗', '车': '🚙', '回来': '🔁', '分钟': '⏲️', '衣服': '👗', '漂亮': '✨',
  '认识': '🤝', '年': '🎆', '大学': '🏛️', '饭店': '🏨', '出租车': '🚕',
  '一起': '👨‍👩‍👧‍👦', '高兴': '😄', '听': '👂', '飞机': '✈️',
  // Unit đặc biệt
  '我爱你': '❤️', '想你': '🥺', '亲爱的': '💑', '宝贝': '💎', '心': '💗',
  '开心': '😊', '约会': '💐', '牵手': '🫱🫲', '拥抱': '🤗', '永远': '♾️', '幸福': '🌈',
};

/**
 * Hội thoại luyện tập + chú thích ngữ pháp cho từng bài.
 * Nội dung tự soạn theo đúng chủ đề và điểm ngữ pháp của giáo trình HSK 1,
 * chỉ dùng vốn từ đã học đến bài đó (nội dung nghe nguyên bản nằm ở các track MP3).
 */
export const LESSON_EXTRAS: Record<string, { dialogues: Dialogue[]; grammar: GrammarPoint[] }> = {
  b1: {
    dialogues: [
      {
        title: 'Chào nhau',
        lines: [
          { speaker: 'A', zh: '你好！', pinyin: 'Nǐ hǎo!', vi: 'Chào bạn!' },
          { speaker: 'B', zh: '你好！', pinyin: 'Nǐ hǎo!', vi: 'Chào bạn!' },
        ],
      },
      {
        title: 'Chào người lớn & nhiều người',
        lines: [
          { speaker: 'A', zh: '您好！', pinyin: 'Nín hǎo!', vi: 'Cháu chào bác ạ!' },
          { speaker: 'B', zh: '你们好！', pinyin: 'Nǐmen hǎo!', vi: 'Chào các cháu!' },
        ],
      },
      {
        title: 'Xin lỗi',
        lines: [
          { speaker: 'A', zh: '对不起！', pinyin: 'Duìbuqǐ!', vi: 'Xin lỗi!' },
          { speaker: 'B', zh: '没关系！', pinyin: 'Méi guānxi!', vi: 'Không sao đâu!' },
        ],
      },
    ],
    grammar: [
      {
        title: 'Chào hỏi với 你好 / 您好',
        explanation:
          'Câu chào cơ bản nhất là 你好 (chào bạn). Khi chào người lớn tuổi hoặc muốn tỏ ý lịch sự, thay 你 bằng 您 thành 您好. Chào nhiều người thì dùng 你们好.',
        examples: [
          { zh: '你好！', vi: 'Chào bạn!' },
          { zh: '您好！', vi: 'Chào ông/bà ạ!' },
        ],
      },
      {
        title: 'Xin lỗi và đáp lại: 对不起 / 没关系',
        explanation: 'Khi xin lỗi dùng 对不起. Người kia đáp lại 没关系 nghĩa là "không sao đâu".',
        examples: [
          { zh: '对不起！', vi: 'Xin lỗi!' },
          { zh: '没关系！', vi: 'Không sao!' },
        ],
      },
    ],
  },
  b2: {
    dialogues: [
      {
        title: 'Cảm ơn',
        lines: [
          { speaker: 'A', zh: '谢谢你！', pinyin: 'Xièxie nǐ!', vi: 'Cảm ơn bạn!' },
          { speaker: 'B', zh: '不客气！', pinyin: 'Bú kèqì!', vi: 'Đừng khách sáo!' },
        ],
      },
      {
        title: 'Tạm biệt',
        lines: [
          { speaker: 'A', zh: '再见！', pinyin: 'Zàijiàn!', vi: 'Tạm biệt!' },
          { speaker: 'B', zh: '再见！', pinyin: 'Zàijiàn!', vi: 'Tạm biệt!' },
        ],
      },
    ],
    grammar: [
      {
        title: 'Cảm ơn và đáp lại: 谢谢 / 不客气',
        explanation: 'Cảm ơn ai đó dùng 谢谢 (có thể thêm đối tượng: 谢谢你). Người kia đáp 不客气 — "đừng khách sáo".',
        examples: [
          { zh: '谢谢你！', vi: 'Cảm ơn bạn!' },
          { zh: '不客气！', vi: 'Không có gì!' },
        ],
      },
      {
        title: 'Phủ định với 不',
        explanation: 'Đặt 不 trước động từ hoặc tính từ để phủ định. Chú ý: 不 đọc thành bú khi đứng trước âm tiết thanh 4 (如 不客气 bú kèqì).',
        examples: [
          { zh: '我不好。', vi: 'Mình không khỏe.' },
          { zh: '不客气。', vi: 'Đừng khách sáo.' },
        ],
      },
    ],
  },
  b3: {
    dialogues: [
      {
        title: 'Hỏi tên',
        lines: [
          { speaker: 'A', zh: '你好！你叫什么名字？', pinyin: 'Nǐ hǎo! Nǐ jiào shénme míngzi?', vi: 'Chào bạn! Bạn tên là gì?' },
          { speaker: 'B', zh: '我叫红燕。', pinyin: 'Wǒ jiào Hóng Yàn.', vi: 'Mình tên là Hồng Yến.' },
          { speaker: 'A', zh: '你是学生吗？', pinyin: 'Nǐ shì xuésheng ma?', vi: 'Bạn là học sinh à?' },
          { speaker: 'B', zh: '是，我是学生。', pinyin: 'Shì, wǒ shì xuésheng.', vi: 'Ừ, mình là học sinh.' },
        ],
      },
      {
        title: 'Hỏi quốc tịch',
        lines: [
          { speaker: 'A', zh: '她是中国人吗？', pinyin: 'Tā shì Zhōngguó rén ma?', vi: 'Cô ấy là người Trung Quốc à?' },
          { speaker: 'B', zh: '不是，她是美国人。', pinyin: 'Bú shì, tā shì Měiguó rén.', vi: 'Không phải, cô ấy là người Mỹ.' },
        ],
      },
    ],
    grammar: [
      {
        title: 'Đại từ nghi vấn 什么',
        explanation: '什么 (gì, cái gì) đặt ngay tại vị trí của thứ muốn hỏi, không đảo ngữ như tiếng Việt.',
        examples: [
          { zh: '你叫什么名字？', vi: 'Bạn tên là gì?' },
          { zh: '这是什么？', vi: 'Đây là cái gì?' },
        ],
      },
      {
        title: 'Câu có từ 是',
        explanation: 'Câu chữ 是 dùng để phán đoán "A là B". Phủ định thêm 不 trước 是: A 不是 B.',
        examples: [
          { zh: '我是学生。', vi: 'Mình là học sinh.' },
          { zh: '他不是老师。', vi: 'Anh ấy không phải giáo viên.' },
        ],
      },
      {
        title: 'Câu hỏi có từ 吗',
        explanation: 'Thêm 吗 vào cuối câu trần thuật để tạo câu hỏi có/không.',
        examples: [
          { zh: '你是学生吗？', vi: 'Bạn là học sinh phải không?' },
          { zh: '你好吗？', vi: 'Bạn khỏe không?' },
        ],
      },
    ],
  },
  b4: {
    dialogues: [
      {
        title: 'Cô ấy là ai?',
        lines: [
          { speaker: 'A', zh: '她是谁？', pinyin: 'Tā shì shéi?', vi: 'Cô ấy là ai?' },
          { speaker: 'B', zh: '她是我的汉语老师。', pinyin: 'Tā shì wǒ de Hànyǔ lǎoshī.', vi: 'Cô ấy là cô giáo dạy tiếng Trung của mình.' },
          { speaker: 'A', zh: '你的老师是哪国人？', pinyin: 'Nǐ de lǎoshī shì nǎ guó rén?', vi: 'Cô giáo bạn là người nước nào?' },
          { speaker: 'B', zh: '她是中国人。', pinyin: 'Tā shì Zhōngguó rén.', vi: 'Cô ấy là người Trung Quốc.' },
        ],
      },
      {
        title: 'Bạn hay bạn học?',
        lines: [
          { speaker: 'A', zh: '他是你的同学吗？', pinyin: 'Tā shì nǐ de tóngxué ma?', vi: 'Cậu ấy là bạn học của bạn à?' },
          { speaker: 'B', zh: '不是，他是我的朋友。', pinyin: 'Bú shì, tā shì wǒ de péngyou.', vi: 'Không phải, cậu ấy là bạn của mình.' },
          { speaker: 'A', zh: '你呢？', pinyin: 'Nǐ ne?', vi: 'Còn bạn thì sao?' },
          { speaker: 'B', zh: '我是学生。', pinyin: 'Wǒ shì xuésheng.', vi: 'Mình là học sinh.' },
        ],
      },
    ],
    grammar: [
      {
        title: 'Đại từ nghi vấn 谁 và 哪',
        explanation: '谁 hỏi về người (ai), 哪 hỏi để chọn (nào) và thường đi với danh từ: 哪国人 — người nước nào.',
        examples: [
          { zh: '她是谁？', vi: 'Cô ấy là ai?' },
          { zh: '你是哪国人？', vi: 'Bạn là người nước nào?' },
        ],
      },
      {
        title: 'Trợ từ kết cấu 的',
        explanation: '的 nối định ngữ với danh từ, tương đương "của": 我的老师 — giáo viên của tôi.',
        examples: [
          { zh: '我的朋友', vi: 'Bạn của mình' },
          { zh: '她是我的汉语老师。', vi: 'Cô ấy là cô giáo tiếng Trung của mình.' },
        ],
      },
      {
        title: 'Trợ từ nghi vấn 呢',
        explanation: 'Đặt 呢 sau danh từ/đại từ để hỏi ngược lại vấn đề vừa nhắc: 你呢? — còn bạn thì sao?',
        examples: [
          { zh: '我是学生，你呢？', vi: 'Mình là học sinh, còn bạn?' },
        ],
      },
    ],
  },
  b5: {
    dialogues: [
      {
        title: 'Nhà bạn mấy người?',
        lines: [
          { speaker: 'A', zh: '你家有几口人？', pinyin: 'Nǐ jiā yǒu jǐ kǒu rén?', vi: 'Nhà bạn có mấy người?' },
          { speaker: 'B', zh: '我家有四口人。', pinyin: 'Wǒ jiā yǒu sì kǒu rén.', vi: 'Nhà mình có bốn người.' },
          { speaker: 'A', zh: '你女儿今年几岁？', pinyin: 'Nǐ nǚ\'ér jīnnián jǐ suì?', vi: 'Con gái chị năm nay mấy tuổi?' },
          { speaker: 'B', zh: '她今年十岁了。', pinyin: 'Tā jīnnián shí suì le.', vi: 'Con bé năm nay mười tuổi rồi.' },
        ],
      },
      {
        title: 'Bạn bao nhiêu tuổi?',
        lines: [
          { speaker: 'A', zh: '你今年多大？', pinyin: 'Nǐ jīnnián duō dà?', vi: 'Năm nay bạn bao nhiêu tuổi?' },
          { speaker: 'B', zh: '我今年二十岁。', pinyin: 'Wǒ jīnnián èrshí suì.', vi: 'Năm nay mình 20 tuổi.' },
        ],
      },
    ],
    grammar: [
      {
        title: 'Đại từ nghi vấn 几',
        explanation: '几 hỏi số lượng nhỏ (thường dưới 10) và phải đi kèm lượng từ: 几口人, 几岁.',
        examples: [
          { zh: '你家有几口人？', vi: 'Nhà bạn có mấy người?' },
          { zh: '她几岁？', vi: 'Con bé mấy tuổi?' },
        ],
      },
      {
        title: 'Số đếm dưới 100',
        explanation: 'Ghép số theo quy tắc: 11 = 十一, 20 = 二十, 25 = 二十五, 99 = 九十九.',
        examples: [
          { zh: '二十', vi: '20' },
          { zh: '九十九', vi: '99' },
        ],
      },
      {
        title: 'Trợ từ 了 chỉ sự thay đổi',
        explanation: '了 cuối câu diễn tả tình trạng mới hoặc sự thay đổi: 十岁了 — đã mười tuổi rồi.',
        examples: [
          { zh: '她二十岁了。', vi: 'Cô ấy 20 tuổi rồi.' },
        ],
      },
      {
        title: 'Câu hỏi 多 + 大',
        explanation: '多 + tính từ dùng hỏi mức độ: 多大 — bao nhiêu tuổi (hỏi người ngang hàng/lớn hơn trẻ em).',
        examples: [
          { zh: '你今年多大？', vi: 'Năm nay bạn bao nhiêu tuổi?' },
        ],
      },
    ],
  },
  b6: {
    dialogues: [
      {
        title: 'Bạn biết nói tiếng Trung không?',
        lines: [
          { speaker: 'A', zh: '你会说汉语吗？', pinyin: 'Nǐ huì shuō Hànyǔ ma?', vi: 'Bạn biết nói tiếng Trung không?' },
          { speaker: 'B', zh: '我会说汉语。', pinyin: 'Wǒ huì shuō Hànyǔ.', vi: 'Mình biết nói tiếng Trung.' },
          { speaker: 'A', zh: '你会写汉字吗？', pinyin: 'Nǐ huì xiě Hànzì ma?', vi: 'Bạn biết viết chữ Hán không?' },
          { speaker: 'B', zh: '我会写。', pinyin: 'Wǒ huì xiě.', vi: 'Mình biết viết.' },
        ],
      },
      {
        title: 'Món mẹ nấu',
        lines: [
          { speaker: 'A', zh: '妈妈做的菜怎么样？', pinyin: 'Māma zuò de cài zěnmeyàng?', vi: 'Món mẹ nấu thế nào?' },
          { speaker: 'B', zh: '很好吃！', pinyin: 'Hěn hǎochī!', vi: 'Rất ngon!' },
        ],
      },
    ],
    grammar: [
      {
        title: 'Động từ năng nguyện 会',
        explanation: '会 đặt trước động từ, chỉ kỹ năng có được nhờ học tập: 会说汉语 — biết nói tiếng Trung. Phủ định: 不会.',
        examples: [
          { zh: '我会说汉语。', vi: 'Mình biết nói tiếng Trung.' },
          { zh: '他不会写汉字。', vi: 'Anh ấy không biết viết chữ Hán.' },
        ],
      },
      {
        title: 'Câu có vị ngữ là tính từ',
        explanation: 'Tính từ làm vị ngữ không cần 是, thường thêm 很 phía trước: 菜很好吃 (không nói 菜是好吃).',
        examples: [
          { zh: '这个菜很好吃。', vi: 'Món này rất ngon.' },
          { zh: '我很好。', vi: 'Mình rất khỏe.' },
        ],
      },
      {
        title: 'Đại từ nghi vấn 怎么',
        explanation: '怎么 + động từ hỏi về cách thức: 怎么写 — viết thế nào, 怎么读 — đọc thế nào.',
        examples: [
          { zh: '这个字怎么读？', vi: 'Chữ này đọc thế nào?' },
          { zh: '你的名字怎么写？', vi: 'Tên bạn viết thế nào?' },
        ],
      },
    ],
  },
  b7: {
    dialogues: [
      {
        title: 'Hôm nay ngày mấy?',
        lines: [
          { speaker: 'A', zh: '请问，今天几号？', pinyin: 'Qǐngwèn, jīntiān jǐ hào?', vi: 'Xin hỏi, hôm nay là ngày mấy?' },
          { speaker: 'B', zh: '今天七月二十号。', pinyin: 'Jīntiān qī yuè èrshí hào.', vi: 'Hôm nay là ngày 20 tháng 7.' },
          { speaker: 'A', zh: '今天星期几？', pinyin: 'Jīntiān xīngqī jǐ?', vi: 'Hôm nay thứ mấy?' },
          { speaker: 'B', zh: '星期一。', pinyin: 'Xīngqī yī.', vi: 'Thứ hai.' },
        ],
      },
      {
        title: 'Đi trường học',
        lines: [
          { speaker: 'A', zh: '明天你去学校吗？', pinyin: 'Míngtiān nǐ qù xuéxiào ma?', vi: 'Mai bạn đến trường không?' },
          { speaker: 'B', zh: '去，我去学校看书。', pinyin: 'Qù, wǒ qù xuéxiào kàn shū.', vi: 'Có, mình đến trường đọc sách.' },
        ],
      },
    ],
    grammar: [
      {
        title: 'Cách nói ngày tháng (1)',
        explanation: 'Thứ tự từ lớn đến nhỏ: tháng → ngày → thứ. Ngày dùng 号 (khẩu ngữ): 七月二十号. Thứ dùng 星期 + số: 星期一 (thứ hai)… 星期五 (thứ sáu).',
        examples: [
          { zh: '今天七月二十号。', vi: 'Hôm nay là 20 tháng 7.' },
          { zh: '明天星期三。', vi: 'Mai là thứ tư.' },
        ],
      },
      {
        title: 'Câu có vị ngữ là danh từ',
        explanation: 'Nói về ngày tháng, tuổi… danh từ có thể làm vị ngữ trực tiếp, không cần 是: 今天星期一.',
        examples: [
          { zh: '今天二十号。', vi: 'Hôm nay ngày 20.' },
        ],
      },
      {
        title: 'Câu liên động: 去 + nơi chốn + làm gì',
        explanation: 'Hai động từ nối tiếp diễn tả mục đích: 去学校看书 — đến trường (để) đọc sách.',
        examples: [
          { zh: '我去学校看书。', vi: 'Mình đến trường đọc sách.' },
          { zh: '他去商店买东西。', vi: 'Anh ấy đến cửa hàng mua đồ.' },
        ],
      },
    ],
  },
  b8: {
    dialogues: [
      {
        title: 'Muốn uống gì?',
        lines: [
          { speaker: 'A', zh: '你想喝什么？', pinyin: 'Nǐ xiǎng hē shénme?', vi: 'Bạn muốn uống gì?' },
          { speaker: 'B', zh: '我想喝茶。', pinyin: 'Wǒ xiǎng hē chá.', vi: 'Mình muốn uống trà.' },
          { speaker: 'A', zh: '你想吃什么？', pinyin: 'Nǐ xiǎng chī shénme?', vi: 'Bạn muốn ăn gì?' },
          { speaker: 'B', zh: '我想吃米饭。', pinyin: 'Wǒ xiǎng chī mǐfàn.', vi: 'Mình muốn ăn cơm.' },
        ],
      },
      {
        title: 'Mua ly',
        lines: [
          { speaker: 'A', zh: '这个杯子多少钱？', pinyin: 'Zhège bēizi duōshao qián?', vi: 'Cái ly này bao nhiêu tiền?' },
          { speaker: 'B', zh: '十块钱。', pinyin: 'Shí kuài qián.', vi: 'Mười đồng.' },
          { speaker: 'A', zh: '那个呢？', pinyin: 'Nàge ne?', vi: 'Còn cái kia?' },
          { speaker: 'B', zh: '那个八块。', pinyin: 'Nàge bā kuài.', vi: 'Cái kia tám đồng.' },
        ],
      },
    ],
    grammar: [
      {
        title: 'Động từ năng nguyện 想',
        explanation: '想 + động từ diễn tả mong muốn: 想喝茶 — muốn uống trà. Phủ định: 不想.',
        examples: [
          { zh: '我想喝茶。', vi: 'Mình muốn uống trà.' },
          { zh: '我不想去。', vi: 'Mình không muốn đi.' },
        ],
      },
      {
        title: 'Đại từ nghi vấn 多少',
        explanation: '多少 hỏi số lượng bất kỳ (thường trên 10), không bắt buộc lượng từ: 多少钱 — bao nhiêu tiền.',
        examples: [
          { zh: '这个多少钱？', vi: 'Cái này bao nhiêu tiền?' },
        ],
      },
      {
        title: 'Lượng từ 个 và 口',
        explanation: 'Danh từ đếm được cần lượng từ: 一个苹果, 这个杯子. 口 chuyên đếm người trong gia đình: 四口人.',
        examples: [
          { zh: '一个杯子', vi: 'Một cái ly' },
          { zh: '我家有四口人。', vi: 'Nhà mình có bốn người.' },
        ],
      },
      {
        title: 'Cách nói số tiền',
        explanation: 'Số + 块 (+ 钱): 十块钱 — mười đồng. Trong khẩu ngữ có thể bỏ 钱.',
        examples: [
          { zh: '八块（钱）', vi: 'Tám đồng' },
        ],
      },
    ],
  },
  b9: {
    dialogues: [
      {
        title: 'Bố làm việc ở đâu?',
        lines: [
          { speaker: 'A', zh: '你爸爸在哪儿工作？', pinyin: 'Nǐ bàba zài nǎr gōngzuò?', vi: 'Bố bạn làm việc ở đâu?' },
          { speaker: 'B', zh: '他在医院工作，他是医生。', pinyin: 'Tā zài yīyuàn gōngzuò, tā shì yīshēng.', vi: 'Bố mình làm ở bệnh viện, bố là bác sĩ.' },
        ],
      },
      {
        title: 'Mèo con ở đâu?',
        lines: [
          { speaker: 'A', zh: '小猫在哪儿？', pinyin: 'Xiǎo māo zài nǎr?', vi: 'Mèo con ở đâu?' },
          { speaker: 'B', zh: '小猫在椅子下面。', pinyin: 'Xiǎo māo zài yǐzi xiàmiàn.', vi: 'Mèo con ở dưới ghế.' },
          { speaker: 'A', zh: '小狗呢？', pinyin: 'Xiǎo gǒu ne?', vi: 'Còn cún con?' },
          { speaker: 'B', zh: '小狗在桌子下面。', pinyin: 'Xiǎo gǒu zài zhuōzi xiàmiàn.', vi: 'Cún con ở dưới bàn.' },
        ],
      },
    ],
    grammar: [
      {
        title: 'Động từ 在',
        explanation: '在 làm động từ chính nghĩa là "ở": 小猫在椅子下面 — mèo con ở dưới ghế.',
        examples: [
          { zh: '他在家。', vi: 'Anh ấy ở nhà.' },
        ],
      },
      {
        title: 'Đại từ nghi vấn 哪儿',
        explanation: '哪儿 hỏi nơi chốn (ở đâu), đặt tại vị trí của địa điểm trong câu.',
        examples: [
          { zh: '你在哪儿？', vi: 'Bạn đang ở đâu?' },
          { zh: '医院在哪儿？', vi: 'Bệnh viện ở đâu?' },
        ],
      },
      {
        title: 'Giới từ 在',
        explanation: '在 + nơi chốn đứng trước động từ chỉ nơi diễn ra hành động: 在医院工作 — làm việc ở bệnh viện.',
        examples: [
          { zh: '他在医院工作。', vi: 'Anh ấy làm việc ở bệnh viện.' },
        ],
      },
    ],
  },
  b10: {
    dialogues: [
      {
        title: 'Ngồi đây được không?',
        lines: [
          { speaker: 'A', zh: '我能坐这儿吗？', pinyin: 'Wǒ néng zuò zhèr ma?', vi: 'Mình ngồi đây được không?' },
          { speaker: 'B', zh: '能，请坐！', pinyin: 'Néng, qǐng zuò!', vi: 'Được chứ, mời ngồi!' },
          { speaker: 'A', zh: '谢谢！', pinyin: 'Xièxie!', vi: 'Cảm ơn!' },
        ],
      },
      {
        title: 'Trên bàn có gì?',
        lines: [
          { speaker: 'A', zh: '桌子上有什么？', pinyin: 'Zhuōzi shang yǒu shénme?', vi: 'Trên bàn có gì thế?' },
          { speaker: 'B', zh: '有一个电脑和三本书。', pinyin: 'Yǒu yí ge diànnǎo hé sān běn shū.', vi: 'Có một cái máy tính và ba quyển sách.' },
        ],
      },
    ],
    grammar: [
      {
        title: 'Câu chữ 有 chỉ sự tồn tại',
        explanation: 'Nơi chốn + 有 + vật: diễn tả "ở đâu có gì". Phủ định dùng 没有.',
        examples: [
          { zh: '桌子上有电脑。', vi: 'Trên bàn có máy tính.' },
          { zh: '家里没有人。', vi: 'Trong nhà không có ai.' },
        ],
      },
      {
        title: 'Liên từ 和',
        explanation: '和 nối hai danh từ/cụm danh từ, nghĩa là "và": 电脑和书.',
        examples: [
          { zh: '我和你', vi: 'Mình và bạn' },
        ],
      },
      {
        title: 'Động từ năng nguyện 能',
        explanation: '能 chỉ khả năng hoặc xin phép trong tình huống cụ thể: 能坐这儿吗? — ngồi đây được không?',
        examples: [
          { zh: '我能坐这儿吗？', vi: 'Mình ngồi đây được không?' },
        ],
      },
      {
        title: 'Câu cầu khiến với 请',
        explanation: '请 + động từ để mời hoặc đề nghị lịch sự: 请坐 — mời ngồi.',
        examples: [
          { zh: '请坐！', vi: 'Mời ngồi!' },
          { zh: '请问…', vi: 'Xin hỏi…' },
        ],
      },
    ],
  },
  b11: {
    dialogues: [
      {
        title: 'Bây giờ mấy giờ?',
        lines: [
          { speaker: 'A', zh: '现在几点？', pinyin: 'Xiànzài jǐ diǎn?', vi: 'Bây giờ mấy giờ rồi?' },
          { speaker: 'B', zh: '现在八点十分。', pinyin: 'Xiànzài bā diǎn shí fēn.', vi: 'Bây giờ 8 giờ 10 phút.' },
          { speaker: 'A', zh: '我们什么时候去吃饭？', pinyin: 'Wǒmen shénme shíhou qù chī fàn?', vi: 'Khi nào chúng mình đi ăn?' },
          { speaker: 'B', zh: '中午十二点。', pinyin: 'Zhōngwǔ shí\'èr diǎn.', vi: 'Mười hai giờ trưa.' },
        ],
      },
      {
        title: 'Bạn sống ở đâu?',
        lines: [
          { speaker: 'A', zh: '你住在哪儿？', pinyin: 'Nǐ zhù zài nǎr?', vi: 'Bạn sống ở đâu?' },
          { speaker: 'B', zh: '我住在北京。', pinyin: 'Wǒ zhù zài Běijīng.', vi: 'Mình sống ở Bắc Kinh.' },
        ],
      },
    ],
    grammar: [
      {
        title: 'Cách nói thời gian',
        explanation: 'Giờ dùng 点, phút dùng 分: 八点十分 — 8 giờ 10 phút. Buổi đặt trước giờ: 中午十二点, 上午九点.',
        examples: [
          { zh: '现在八点。', vi: 'Bây giờ 8 giờ.' },
          { zh: '下午三点十分', vi: '3 giờ 10 chiều' },
        ],
      },
      {
        title: 'Từ chỉ thời gian làm trạng ngữ',
        explanation: 'Thời gian đứng trước động từ (hoặc đầu câu): 我们中午吃饭 — trưa chúng mình ăn cơm.',
        examples: [
          { zh: '我们中午十二点吃饭。', vi: 'Trưa 12 giờ chúng mình ăn cơm.' },
        ],
      },
      {
        title: 'Danh từ 前',
        explanation: '前 sau mốc thời gian nghĩa là "trước": 十点前 — trước 10 giờ.',
        examples: [
          { zh: '十点前回家。', vi: 'Về nhà trước 10 giờ.' },
        ],
      },
    ],
  },
  b12: {
    dialogues: [
      {
        title: 'Thời tiết ngày mai',
        lines: [
          { speaker: 'A', zh: '明天天气怎么样？', pinyin: 'Míngtiān tiānqì zěnmeyàng?', vi: 'Ngày mai thời tiết thế nào?' },
          { speaker: 'B', zh: '明天太热了！', pinyin: 'Míngtiān tài rè le!', vi: 'Mai nóng lắm!' },
          { speaker: 'A', zh: '今天呢？', pinyin: 'Jīntiān ne?', vi: 'Còn hôm nay?' },
          { speaker: 'B', zh: '今天下雨。', pinyin: 'Jīntiān xià yǔ.', vi: 'Hôm nay trời mưa.' },
        ],
      },
      {
        title: 'Hỏi thăm sức khỏe',
        lines: [
          { speaker: 'A', zh: '你妈妈身体怎么样？', pinyin: 'Nǐ māma shēntǐ zěnmeyàng?', vi: 'Mẹ bạn sức khỏe thế nào?' },
          { speaker: 'B', zh: '她身体很好，谢谢！', pinyin: 'Tā shēntǐ hěn hǎo, xièxie!', vi: 'Mẹ mình khỏe lắm, cảm ơn bạn!' },
        ],
      },
    ],
    grammar: [
      {
        title: 'Đại từ nghi vấn 怎么样',
        explanation: '怎么样 đặt cuối câu để hỏi ý kiến, tình trạng: …怎么样? — … thế nào?',
        examples: [
          { zh: '明天天气怎么样？', vi: 'Mai thời tiết thế nào?' },
        ],
      },
      {
        title: 'Câu chủ-vị làm vị ngữ',
        explanation: 'Cụm chủ-vị có thể làm vị ngữ: 她身体很好 — cô ấy sức khỏe rất tốt (chủ ngữ lớn 她, cụm 身体很好 làm vị ngữ).',
        examples: [
          { zh: '她身体很好。', vi: 'Cô ấy sức khỏe rất tốt.' },
        ],
      },
      {
        title: 'Phó từ 太',
        explanation: '太 + tính từ (+ 了) chỉ mức độ cao: 太热了 — nóng quá.',
        examples: [
          { zh: '太贵了！', vi: 'Đắt quá!' },
          { zh: '太好了！', vi: 'Tốt quá!' },
        ],
      },
    ],
  },
  b13: {
    dialogues: [
      {
        title: 'Gọi điện thoại',
        lines: [
          { speaker: 'A', zh: '喂，你好！你在做什么呢？', pinyin: 'Wèi, nǐ hǎo! Nǐ zài zuò shénme ne?', vi: 'A lô, chào cậu! Cậu đang làm gì đấy?' },
          { speaker: 'B', zh: '我在学习汉语呢。', pinyin: 'Wǒ zài xuéxí Hànyǔ ne.', vi: 'Mình đang học tiếng Trung.' },
          { speaker: 'A', zh: '明天来我家看电视吧！', pinyin: 'Míngtiān lái wǒ jiā kàn diànshì ba!', vi: 'Mai đến nhà mình xem tivi đi!' },
          { speaker: 'B', zh: '好！', pinyin: 'Hǎo!', vi: 'Được!' },
        ],
      },
      {
        title: 'Đang làm gì đó?',
        lines: [
          { speaker: 'A', zh: '你喜欢做什么？', pinyin: 'Nǐ xǐhuan zuò shénme?', vi: 'Bạn thích làm gì?' },
          { speaker: 'B', zh: '我喜欢看电视。', pinyin: 'Wǒ xǐhuan kàn diànshì.', vi: 'Mình thích xem tivi.' },
          { speaker: 'A', zh: '现在你在做什么呢？', pinyin: 'Xiànzài nǐ zài zuò shénme ne?', vi: 'Bây giờ bạn đang làm gì?' },
          { speaker: 'B', zh: '我在睡觉呢！', pinyin: 'Wǒ zài shuìjiào ne!', vi: 'Mình đang ngủ đây!' },
        ],
      },
    ],
    grammar: [
      {
        title: 'Thán từ 喂',
        explanation: '喂 dùng khi nghe/gọi điện thoại, như "a lô" tiếng Việt.',
        examples: [
          { zh: '喂，你好！', vi: 'A lô, xin chào!' },
        ],
      },
      {
        title: '在……呢 diễn tả hành động đang diễn ra',
        explanation: '在 + động từ (+ 呢) diễn tả việc đang làm: 我在学习呢 — mình đang học.',
        examples: [
          { zh: '我在学习汉语呢。', vi: 'Mình đang học tiếng Trung.' },
          { zh: '他在睡觉呢。', vi: 'Anh ấy đang ngủ.' },
        ],
      },
      {
        title: 'Trợ từ ngữ khí 吧',
        explanation: '吧 cuối câu làm dịu giọng khi đề nghị, rủ rê: 来我家吧 — đến nhà mình đi.',
        examples: [
          { zh: '我们去吃饭吧！', vi: 'Chúng mình đi ăn thôi!' },
        ],
      },
      {
        title: 'Cách đọc số điện thoại',
        explanation: 'Đọc từng chữ số một; số 1 đọc là yāo thay vì yī để tránh nhầm với 七 (qī).',
        examples: [
          { zh: '一三八 → yāo sān bā', vi: 'Đọc 138: yāo-sān-bā' },
        ],
      },
    ],
  },
  b14: {
    dialogues: [
      {
        title: 'Mua sắm về',
        lines: [
          { speaker: 'A', zh: '你看见王小姐了吗？', pinyin: 'Nǐ kànjiàn Wáng xiǎojiě le ma?', vi: 'Bạn có thấy cô Vương không?' },
          { speaker: 'B', zh: '看见了，她在商店买东西呢。', pinyin: 'Kànjiàn le, tā zài shāngdiàn mǎi dōngxi ne.', vi: 'Thấy rồi, cô ấy đang mua đồ ở cửa hàng.' },
          { speaker: 'A', zh: '她买了什么？', pinyin: 'Tā mǎi le shénme?', vi: 'Cô ấy mua gì thế?' },
          { speaker: 'B', zh: '她买了不少衣服，都很漂亮！', pinyin: 'Tā mǎi le bùshǎo yīfu, dōu hěn piàoliang!', vi: 'Cô ấy mua nhiều quần áo lắm, bộ nào cũng đẹp!' },
        ],
      },
      {
        title: 'Lái xe',
        lines: [
          { speaker: 'A', zh: '张先生会开车吗？', pinyin: 'Zhāng xiānsheng huì kāi chē ma?', vi: 'Ông Trương biết lái xe không?' },
          { speaker: 'B', zh: '会，他十分钟后回来。', pinyin: 'Huì, tā shí fēnzhōng hòu huílai.', vi: 'Biết, mười phút nữa ông ấy quay lại.' },
        ],
      },
    ],
    grammar: [
      {
        title: '了 chỉ việc đã xảy ra/hoàn thành',
        explanation: '了 sau động từ diễn tả hành động đã hoàn thành: 买了不少衣服 — đã mua nhiều quần áo.',
        examples: [
          { zh: '她买了不少东西。', vi: 'Cô ấy đã mua nhiều đồ.' },
          { zh: '我看见她了。', vi: 'Mình thấy cô ấy rồi.' },
        ],
      },
      {
        title: 'Danh từ 后',
        explanation: 'Khoảng thời gian + 后 nghĩa là "sau…": 十分钟后 — mười phút sau.',
        examples: [
          { zh: '十分钟后回来。', vi: 'Mười phút nữa quay lại.' },
        ],
      },
      {
        title: 'Phó từ 都',
        explanation: '都 đứng trước động từ/tính từ chỉ "đều, tất cả": 都很漂亮 — đều rất đẹp.',
        examples: [
          { zh: '我们都是学生。', vi: 'Chúng mình đều là học sinh.' },
        ],
      },
      {
        title: 'Trợ từ ngữ khí 啊',
        explanation: '啊 cuối câu tăng cảm xúc, khen ngợi: 好漂亮啊! — đẹp quá à!',
        examples: [
          { zh: '好漂亮啊！', vi: 'Đẹp quá!' },
        ],
      },
    ],
  },
  b15: {
    dialogues: [
      {
        title: 'Rất vui được quen bạn',
        lines: [
          { speaker: 'A', zh: '认识你我很高兴！', pinyin: 'Rènshi nǐ wǒ hěn gāoxìng!', vi: 'Quen được bạn mình rất vui!' },
          { speaker: 'B', zh: '认识你我也很高兴！', pinyin: 'Rènshi nǐ wǒ yě hěn gāoxìng!', vi: 'Mình cũng rất vui được quen bạn!' },
          { speaker: 'A', zh: '你是怎么来北京的？', pinyin: 'Nǐ shì zěnme lái Běijīng de?', vi: 'Bạn đến Bắc Kinh bằng gì thế?' },
          { speaker: 'B', zh: '我是坐飞机来的。', pinyin: 'Wǒ shì zuò fēijī lái de.', vi: 'Mình đi máy bay đến.' },
        ],
      },
      {
        title: 'Đi đại học',
        lines: [
          { speaker: 'A', zh: '明天我们一起去大学吧！', pinyin: 'Míngtiān wǒmen yìqǐ qù dàxué ba!', vi: 'Mai chúng mình cùng đến trường đại học đi!' },
          { speaker: 'B', zh: '好，我们坐出租车去。', pinyin: 'Hǎo, wǒmen zuò chūzūchē qù.', vi: 'Ừ, chúng mình đi taxi nhé.' },
        ],
      },
    ],
    grammar: [
      {
        title: 'Câu 是……的 nhấn mạnh',
        explanation: 'Với việc đã xảy ra, dùng 是……的 để nhấn mạnh thời gian, địa điểm hoặc cách thức: 我是坐飞机来的 — tôi đến bằng máy bay (nhấn mạnh cách thức).',
        examples: [
          { zh: '我是坐飞机来的。', vi: 'Mình đến bằng máy bay.' },
          { zh: '他是昨天来的。', vi: 'Anh ấy đến hôm qua.' },
        ],
      },
      {
        title: 'Cách nói ngày tháng (2) — đầy đủ',
        explanation: 'Thứ tự đầy đủ từ lớn đến nhỏ: năm → tháng → ngày → thứ: 二零二六年七月二十号星期一.',
        examples: [
          { zh: '二零二六年七月二十号', vi: 'Ngày 20/7/2026' },
        ],
      },
    ],
  },
};
