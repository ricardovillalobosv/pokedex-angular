import { Injectable } from '@angular/core';
import { Pokemon } from '@core/models/pokemon.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedPokemonDataService {
  private pokemonSource = new BehaviorSubject<Pokemon>({});

  pokemon$ = this.pokemonSource.asObservable();

  updatePokemon(pokemon: Pokemon) {
    this.pokemonSource.next(pokemon);
  }
}
