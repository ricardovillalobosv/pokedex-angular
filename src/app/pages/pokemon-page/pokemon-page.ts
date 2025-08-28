import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonServices } from '@core/services/pokemon-services';
import { Pokemon } from '@core/models/pokemon.model';
import { SerializationPipe } from '@core/pipes/serialization-pipe';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Tag } from '@components/tag/tag';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SerializationPipe,
    TitleCasePipe,
    UpperCasePipe,
    Tag,
],
  templateUrl: './pokemon-page.html',
  styleUrl: './pokemon-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonPage implements OnInit {
  id = input.required<number>();
  pokemonServices = inject(PokemonServices);
  loading = signal<boolean>(false);
  pokemon = signal<Pokemon>({});

  ngOnInit(): void {
    this.searchPokemon();
  }

  searchPokemon() {
    this.loading.set(true);

    if (!this.id()) return;

    this.pokemonServices.searchPokemon(this.id()).subscribe({
      next: (response: Pokemon) => {
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

  get firstType() {
    const pokemon = this.pokemon();
    if (!pokemon || !pokemon.types?.length) {
      return '';
    }

    return pokemon.types[0];
  }
}
