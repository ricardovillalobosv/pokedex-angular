import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  Chain,
  EvolutionData,
  EvolutionRESTData,
  SpeciesRESTData,
} from '@core/models/evolution-result.model';
import { PokemonList } from '@core/models/pokemon-list.model';
import {
  Ability,
  PokemonRESTData,
  PokemonResult,
  Type,
} from '@core/models/pokemon-result.model';
import { Pokemon } from '@core/models/pokemon.model';
import { forkJoin, map, mergeMap, Observable, switchMap } from 'rxjs';

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
      map(({ id, name, types, height, weight, abilities, stats, species }) => {
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
          speciesUrl: species?.url,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
        } as Pokemon;
      })
    );
  }

  getSpecies(url: string) {
    return this.http.get(url).pipe(
      map((reponse) => {
        return;
      })
    );
  }

  getEvolutionChain(url: string): Observable<EvolutionData[]> {
    return this.http.get<SpeciesRESTData>(url).pipe(
      switchMap((species) =>
        this.http.get<EvolutionRESTData>(species.evolution_chain.url)
      ),
      map((response) => {
        const evolutionChain = this.getEvolutionChainFormat(response.chain);
        return evolutionChain;
      })
    );
  }

  private getTypes(types: Type[] | undefined) {
    return types?.map(({ type }) => type?.name) ?? [];
  }

  private getAbilities(abilities: Ability[] | undefined) {
    return abilities?.map(({ ability }) => ability?.name) ?? [];
  }

  private getEvolutionChainFormat(
    chain: Chain,
    result: EvolutionData[] = []
  ): EvolutionData[] {
    const id = chain.species.url.split('/').filter(Boolean).pop();

    result.push({
      name: chain.species.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    });

    for (const evo of chain.evolves_to) {
      this.getEvolutionChainFormat(evo, result);
    }

    return result;
  }
}
