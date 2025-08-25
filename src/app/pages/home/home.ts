import { Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '@core/models/pokemon.model';
import { PokemonServices } from '@core/services/pokemon-services';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';

@Component({
  selector: 'app-home',
  imports: [PokemonCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export default class Home implements OnInit {
  private pokemonServices = inject(PokemonServices);
  private offset = signal<number>(0);
  private limit = signal<number>(15);
  protected pokemons = signal<Pokemon[]>([]);

  ngOnInit(): void {
    this.pokemonServices.getPokemons(this.offset(), this.limit()).subscribe({
      next: (pokemons: Pokemon[]) => {
        console.log('pokemons', pokemons);
        this.pokemons.set(pokemons);
      },
      error: () => {},
      complete: () => {},
    });
  }
}
