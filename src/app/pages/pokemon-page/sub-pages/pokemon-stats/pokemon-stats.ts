import { JsonPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Stat } from '@core/models/pokemon-result.model';
import { Pokemon } from '@core/models/pokemon.model';
import { SharedPokemonDataService } from '@core/services/shared-pokemon-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-stats',
  imports: [TitleCasePipe],
  templateUrl: './pokemon-stats.html',
  styleUrl: './pokemon-stats.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonStats implements OnInit, OnDestroy {
  readonly stats = signal<Stat[]>([]);

  private sharedPokemonDataService = inject(SharedPokemonDataService);

  private serviceSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.serviceSubscription = this.sharedPokemonDataService.pokemon$.subscribe(
      {
        next: (pokemon) => {
          this.stats.set(pokemon.stats || []);
        },
      }
    );
  }

  ngOnDestroy(): void {
    this.serviceSubscription?.unsubscribe();
  }

  buildWidth(value: number): string {
    const percentage = value > 100 ? 100 : value;
    return `width:${percentage}%`;
  }
}
