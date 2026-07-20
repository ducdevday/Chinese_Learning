import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsPageComponent {
  private settingsService = inject(SettingsService);
  settings = this.settingsService.settings;

  nickname = this.settings().nickname;
  dailyGoal = this.settings().dailyGoal;
  showLoveNotes = this.settings().showLoveNotes;
  saved = false;

  save(): void {
    this.settingsService.update({
      nickname: this.nickname.trim() || 'Hồng Yến',
      dailyGoal: Math.max(1, Math.min(50, Math.floor(this.dailyGoal) || 10)),
      showLoveNotes: this.showLoveNotes,
    });
    this.saved = true;
    setTimeout(() => (this.saved = false), 2000);
  }
}
