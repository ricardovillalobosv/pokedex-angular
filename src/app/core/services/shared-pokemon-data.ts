import { Injectable } from '@angular/core';
import { Pokemon } from '@core/models/pokemon.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedPokemonDataService {
  private pokemonSource = new BehaviorSubject<Pokemon>({});
  private loadingSource = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSource.asObservable();
  pokemon$ = this.pokemonSource.asObservable();

  updatePokemon(pokemon: Pokemon) {
    this.pokemonSource.next(pokemon);
  }

  updateLoading(value: boolean) {
    this.loadingSource.next(value);
  }
}
