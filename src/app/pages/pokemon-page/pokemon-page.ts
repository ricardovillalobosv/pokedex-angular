import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonServices } from '@core/services/pokemon-services';
import { Pokemon } from '@core/models/pokemon.model';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SharedPokemonDataService } from '@core/services/shared-pokemon-data';
import { Subscription } from 'rxjs';
import { CardPokemonPage } from './components/card-pokemon-page/card-pokemon-page';
import { SkeletonCardPokemonPage } from './components/skeleton-card-pokemon-page/skeleton-card-pokemon-page';

@Component({
  selector: 'app-pokemon',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CardPokemonPage,
    SkeletonCardPokemonPage,
  ],
  templateUrl: './pokemon-page.html',
  styleUrl: './pokemon-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonPage implements OnInit, OnDestroy {
  id = input.required<number>();

  pokemonServices = inject(PokemonServices);
  loading = signal<boolean>(true);
  pokemon = signal<Pokemon>({});

  sharedPokemonDataService = inject(SharedPokemonDataService);
  private servicesSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.searchPokemon();
  }

  ngOnDestroy(): void {
    this.servicesSubscription?.unsubscribe();
  }

  searchPokemon() {
    this.loading.set(true);
    this.sharedPokemonDataService.updateLoading(this.loading());

    if (!this.id()) return;

    this.servicesSubscription = this.pokemonServices
      .searchPokemon(this.id())
      .subscribe({
        next: (response: Pokemon) => {
          this.sharedPokemonDataService.updatePokemon(response);
          this.pokemon.set(response);
        },
        error: (error) => {
          console.log('Err', error);
        },
        complete: () => {
          this.loading.set(false);
          this.sharedPokemonDataService.updateLoading(this.loading());
        },
      });
  }
}
