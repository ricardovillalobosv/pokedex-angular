import { PokemonResult } from "./pokemon-result.model";

export interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: PokemonResult[];
}