import { Routes } from '@angular/router';
import { PokemonAbout } from './sub-pages/pokemon-about/pokemon-about';
import { PokemonStats } from './sub-pages/pokemon-stats/pokemon-stats';
import { PokemonEvolution } from './sub-pages/pokemon-evolution/pokemon-evolution';
import { PokemonPage } from './pokemon-page';

export const pokemonPageRoutes: Routes = [
  {
    path: '',
    component: PokemonPage,
    children: [
      {
        path: 'about',
        component: PokemonAbout,
      },
      {
        path: 'stats',
        component: PokemonStats,
      },
      {
        path: 'evolution',
        component: PokemonEvolution,
      },
      {
        path: '**',
        redirectTo: 'about',
      },
    ],
  },
];
