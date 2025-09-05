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
import { SharedPokemonDataService } from '@core/services/shared-pokemon-data';
import { Subscription } from 'rxjs';
import { SkeletonStats } from '../../components/skeleton-stats/skeleton-stats';

@Component({
  selector: 'app-pokemon-stats',
  imports: [TitleCasePipe, SkeletonStats],
  templateUrl: './pokemon-stats.html',
  styleUrl: './pokemon-stats.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonStats implements OnInit, OnDestroy {
  readonly stats = signal<Stat[]>([]);
  readonly loading = signal<boolean>(false);

  private sharedPokemonDataService = inject(SharedPokemonDataService);

  private serviceSubscription: Subscription | undefined;
  private loadingSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.getLoading();
    this.getData();
  }

  ngOnDestroy(): void {
    this.serviceSubscription?.unsubscribe();
    this.loadingSubscription?.unsubscribe();
  }

  getData() {
    this.serviceSubscription = this.sharedPokemonDataService.pokemon$.subscribe(
      (pokemon) => {
        this.stats.set(pokemon.stats || []);
      }
    );
  }

  getLoading() {
    this.loadingSubscription = this.sharedPokemonDataService.loading$.subscribe(
      (loading) => {
        this.loading.set(loading);
      }
    );
  }

  buildWidth(value: number): string {
    const percentage = value > 100 ? 100 : value;
    return `width:${percentage}%`;
  }
}
