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
import { SerializationPipe } from '@core/pipes/serialization-pipe';
import { TitleCasePipe } from '@angular/common';
import { Tag } from '@components/tag/tag';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SharedPokemonDataService } from '@core/services/shared-pokemon-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SerializationPipe,
    TitleCasePipe,
    Tag,
  ],
  templateUrl: './pokemon-page.html',
  styleUrl: './pokemon-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonPage implements OnInit, OnDestroy {
  id = input.required<number>();

  pokemonServices = inject(PokemonServices);
  loading = signal<boolean>(false);
  pokemon = signal<Pokemon>({});

  sharedPokemonDataService = inject(SharedPokemonDataService);
  private servicesSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.searchPokemon();
  }

  ngOnDestroy(): void {
    this.servicesSubscription?.unsubscribe();
  }

  get firstType() {
    const pokemon = this.pokemon();
    if (!pokemon || !pokemon.types?.length) {
      return '';
    }

    return pokemon.types[0];
  }

  searchPokemon() {
    this.loading.set(true);

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
        },
      });
  }
}
