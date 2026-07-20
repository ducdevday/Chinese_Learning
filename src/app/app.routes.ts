import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'lo-trinh', loadComponent: () => import('./pages/roadmap/roadmap.component').then(m => m.RoadmapComponent) },
  { path: 'bai-hoc/:id', loadComponent: () => import('./pages/lesson/lesson.component').then(m => m.LessonComponent) },
  { path: 'flashcard', loadComponent: () => import('./pages/flashcards/flashcards.component').then(m => m.FlashcardsComponent) },
  { path: 'quiz', loadComponent: () => import('./pages/quiz/quiz.component').then(m => m.QuizComponent) },
  { path: 'luyen-nghe', loadComponent: () => import('./pages/listening/listening.component').then(m => m.ListeningComponent) },
  { path: 'luyen-noi', loadComponent: () => import('./pages/speaking/speaking.component').then(m => m.SpeakingComponent) },
  { path: 'luyen-viet', loadComponent: () => import('./pages/writing/writing.component').then(m => m.WritingComponent) },
  { path: 'cai-dat', loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsPageComponent) },
  { path: '**', redirectTo: '' },
];
