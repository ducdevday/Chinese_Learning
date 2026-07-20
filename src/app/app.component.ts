import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SettingsService } from './core/services/settings.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private settingsService = inject(SettingsService);
  settings = this.settingsService.settings;

  nav = [
    { path: '/', label: 'Trang chủ', emoji: '🏠', exact: true },
    { path: '/lo-trinh', label: 'Lộ trình', emoji: '📘', exact: false },
    { path: '/flashcard', label: 'Flashcard', emoji: '🎴', exact: false },
    { path: '/quiz', label: 'Quiz', emoji: '✏️', exact: false },
    { path: '/luyen-nghe', label: 'Luyện nghe', emoji: '🎧', exact: false },
    { path: '/luyen-noi', label: 'Luyện nói', emoji: '🎤', exact: false },
    { path: '/luyen-viet', label: 'Luyện viết', emoji: '🖌️', exact: false },
    { path: '/cai-dat', label: 'Cài đặt', emoji: '⚙️', exact: false },
  ];
}
