import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EvolutionData } from '@core/models/evolution-result.model';
import { SerializationPipe } from '@core/pipes/serialization-pipe';

@Component({
  selector: 'app-simple-card-pokemon',
  imports: [RouterLink, TitleCasePipe, SerializationPipe],
  templateUrl: './simple-card-pokemon.html',
  styleUrl: './simple-card-pokemon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleCardPokemon {
  evolutionData = input.required<EvolutionData>();
}
