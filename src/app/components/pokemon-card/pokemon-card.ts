import { Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { SerializationPipe } from '@core/pipes/serialization-pipe';
import { Pokemon } from '@core/models/pokemon.model';
import { RouterLink } from '@angular/router';
import { Tag } from '@components/tag/tag';

@Component({
  selector: 'app-pokemon-card',
  imports: [RouterLink, SerializationPipe, TitleCasePipe, Tag],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.scss',
})
export class PokemonCard {
  pokemon = input.required<Pokemon>();
}
