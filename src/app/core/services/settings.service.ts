import { Injectable, signal } from '@angular/core';

export interface Settings {
  nickname: string;
  dailyGoal: number;
  showLoveNotes: boolean;
}

const KEY = 'hy-settings';

const DEFAULTS: Settings = {
  nickname: 'Hồng Yến',
  dailyGoal: 10,
  showLoveNotes: true,
};

@Injectable({ providedIn: 'root' })
export class SettingsService {
  readonly settings = signal<Settings>(this.load());

  private load(): Settings {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };
    } catch {
      return { ...DEFAULTS };
    }
  }

  update(patch: Partial<Settings>): void {
    const next = { ...this.settings(), ...patch };
    this.settings.set(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }
}
