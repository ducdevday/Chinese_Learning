# Hồng Yến học tiếng Trung 💗

Website học tiếng Trung căn bản (HSK 1–2) xây dựng bằng **Angular 19**, giao diện theo design "Hồng Yến học tiếng Trung" trên Claude Design.

## Tính năng

- 🏠 **Trang chủ** — lời chào theo buổi, chuỗi ngày học liên tục (streak), mục tiêu từ vựng mỗi ngày, "Từ của ngày hôm nay" kèm phát âm, lời nhắn yêu thương.
- 📘 **Lộ trình theo Giáo trình chuẩn HSK 1** — đủ 15 bài của giáo trình (~150 từ vựng kèm pinyin, từ loại, nghĩa tiếng Việt, số trang sách) + 1 unit "Lời ngọt ngào" riêng, theo dõi tiến độ từng bài.
- 🎧 **File nghe giáo trình** — 85 track MP3 của sách được map vào đúng bài (hội thoại 1–3, luyện phát âm, bài tập nghe). Đặt file vào `public/audio/hsk1/` với tên dạng `01-1.mp3` (thư mục này được gitignore vì file nghe có bản quyền của NXB).
- 📖 **Bài học** — từ vựng gồm chữ Hán, pinyin, nghĩa tiếng Việt, câu ví dụ; bấm để nghe phát âm (giọng zh-CN của trình duyệt); đánh dấu "Đã thuộc".
- 🎴 **Flashcard** — thẻ lật 3D, ưu tiên từ chưa thuộc, tự phát âm khi lật.
- ✏️ **Quiz** — 5 câu trắc nghiệm sinh ngẫu nhiên (Hán→nghĩa, nghĩa→Hán, pinyin→nghĩa), lưu kỷ lục điểm.
- 🎧 **Luyện nghe** — nghe phát âm rồi chọn chữ Hán/nghĩa đúng (8 câu), ưu tiên ôn từ đã học.
- 🎤 **Luyện nói** — đọc từ/câu vào micro, trình duyệt nhận diện tiếng Trung (Web Speech Recognition, cần Chrome/Edge) và chấm đúng/sai.
- 🔁 **Ôn tập thông minh (SRS)** — từ đã học có lịch ôn ngắt quãng (1-3-7-14-30 ngày); trang chủ nhắc "Cần ôn hôm nay", flashcard chế độ ôn tập cập nhật lịch theo kết quả nhớ/quên.
- 🖌️ **Luyện viết** — xem thứ tự nét và tự viết chữ Hán bằng chuột/cảm ứng (thư viện [hanzi-writer](https://hanziwriter.org/), dữ liệu nét chữ tải từ CDN công khai).
- ⚙️ **Cài đặt** — biệt danh, mục tiêu mỗi ngày, bật/tắt lời nhắn yêu thương.

Tiến độ và cài đặt lưu trong `localStorage` — không cần backend.

## Chạy dự án

```bash
npm install
npm start        # dev server tại http://localhost:4200
npm run build    # build production vào dist/
```

> Lưu ý: phát âm dùng Web Speech API (giọng zh-CN của trình duyệt) — chất lượng tùy máy/trình duyệt. Luyện viết cần internet để tải dữ liệu nét chữ.

## Cấu trúc chính

```
src/app/
├── core/
│   ├── models.ts                 # Word, Lesson, Unit, QuizQuestion
│   ├── data/curriculum.ts        # dữ liệu từ vựng tĩnh + lời nhắn
│   └── services/                 # vocab, progress, tts, settings
└── pages/                        # home, roadmap, lesson, flashcards, quiz, writing, settings
```
