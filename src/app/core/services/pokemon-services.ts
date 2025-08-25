import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokemonList } from '@core/models/pokemon-list.model';
import {
  PokemonRESTData,
  PokemonResult,
} from '@core/models/pokemon-result.model';
import { Pokemon } from '@core/models/pokemon.model';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonServices {
  protected readonly pokemonUrl = 'https://pokeapi.co/api/v2';
  private http = inject(HttpClient);

  getPokemons(offset: number, limit: number) {
    const URL = `${this.pokemonUrl}/pokemon?offset=${offset}&limit=${limit}`;
    return this.http.get<PokemonList>(URL).pipe(
      map((response) => response.results),
      mergeMap((pokemons: PokemonResult[]) =>
        forkJoin(pokemons.map((pokemon) => this.getPokemon(pokemon.url)))
      )
    );
  }

  getPokemon(url: string): Observable<Pokemon> {
    return this.http.get<PokemonRESTData>(url).pipe(
      map(({ id, name, types }) => {
        const _types = types?.map(({ type }) => type?.name) ?? [];
        return {
          id,
          name,
          types: _types,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
        } as Pokemon;
      })
    );
  }
}
