import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home'),
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pages/pokemon/pokemon'),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
