import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '/home',
    loadComponent: () => import('./pages/home/home'),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
