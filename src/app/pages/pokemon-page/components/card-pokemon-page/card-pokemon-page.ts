import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Tag } from '@components/tag/tag';
import { Pokemon } from '@core/models/pokemon.model';
import { SerializationPipe } from '@core/pipes/serialization-pipe';

@Component({
  selector: 'app-card-pokemon-page',
  imports: [Tag, SerializationPipe, TitleCasePipe],
  templateUrl: './card-pokemon-page.html',
  styleUrl: './card-pokemon-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPokemonPage {
  pokemon = input.required<Pokemon>();

  get firstType() {
    const pokemon = this.pokemon();
    if (!pokemon || !pokemon.types?.length) {
      return '';
    }

    return pokemon.types[0];
  }
}
