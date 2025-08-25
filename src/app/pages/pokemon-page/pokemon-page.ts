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
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  imports: [SerializationPipe, TitleCasePipe],
  templateUrl: './pokemon-page.html',
  styleUrl: './pokemon-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPage implements OnInit {
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
}
