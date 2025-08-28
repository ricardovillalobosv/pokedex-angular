import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home'),
  },
  {
    path: 'pokemon/:id',
    loadChildren: () =>
      import('./pages/pokemon-page/pokemon-page.routes').then(
        (m) => m.pokemonPageRoutes
      ),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
