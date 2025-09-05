import { Stat } from './pokemon-result.model';

export interface Pokemon {
  id?: number;
  name?: string;
  types?: string[];
  height?: string;
  weight?: string;
  abilities?: string[];
  imageUrl?: string;
  speciesUrl?: string;
  stats?: Stat[];
}
