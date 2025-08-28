import { Routes } from '@angular/router';
import { PokemonAbout } from './pokemon-about/pokemon-about';
import { PokemonStats } from './pokemon-stats/pokemon-stats';
import { PokemonEvolution } from './pokemon-evolution/pokemon-evolution';
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
