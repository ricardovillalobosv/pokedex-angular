import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokemonList } from '@core/models/pokemon-list.model';
import {
  Ability,
  PokemonRESTData,
  PokemonResult,
  Type,
} from '@core/models/pokemon-result.model';
import { Pokemon } from '@core/models/pokemon.model';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonServices {
  protected readonly pokemonUrl = 'https://pokeapi.co/api/v2';
  private http = inject(HttpClient);

  getPokemons(offset: number, limit: number): Observable<Pokemon[]> {
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
        const _types = this.getTypes(types);
        return {
          id,
          name,
          types: _types,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
        } as Pokemon;
      })
    );
  }

  searchPokemon(value: number | string): Observable<Pokemon> {
    const URL = `${this.pokemonUrl}/pokemon/${value}`;
    return this.http.get<PokemonRESTData>(URL).pipe(
      map(({ id, name, types, height, weight, abilities, stats }) => {
        const _types = this.getTypes(types);
        const _height = height ? (height / 10).toFixed(1) : '-';
        const _weight = weight ? (weight / 10).toFixed(1) : '-';
        const _abilities = this.getAbilities(abilities);
        return {
          id,
          name,
          stats,
          types: _types,
          height: `${_height}m`,
          weight: `${_weight}kg`,
          abilities: _abilities,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
        } as Pokemon;
      })
    );
  }

  private getTypes(types: Type[] | undefined) {
    return types?.map(({ type }) => type?.name) ?? [];
  }

  private getAbilities(abilities: Ability[] | undefined) {
    return abilities?.map(({ ability }) => ability?.name) ?? [];
  }
}
