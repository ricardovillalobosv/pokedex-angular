import { UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Pokemon } from '@core/models/pokemon.model';
import { SharedPokemonDataService } from '@core/services/shared-pokemon-data';
import { Subscription } from 'rxjs';
import { SkeletonAbout } from '../../components/skeleton-about/skeleton-about';

@Component({
  selector: 'app-pokemon-about',
  imports: [UpperCasePipe, SkeletonAbout],
  templateUrl: './pokemon-about.html',
  styleUrl: './pokemon-about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonAbout implements OnInit, OnDestroy {
  readonly pokemon = signal<Pokemon>({});
  readonly loading = signal<boolean>(false);

  private sharedPokemonDataService = inject(SharedPokemonDataService);

  private serviceSubscription: Subscription | undefined;
  private loadingSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.getLoading();
    this.getData();
  }

  getLoading() {
    this.loadingSubscription = this.sharedPokemonDataService.loading$.subscribe(
      (loading) => {
        this.loading.set(loading);
      }
    );
  }

  getData() {
    this.serviceSubscription = this.sharedPokemonDataService.pokemon$.subscribe(
      (pokemon) => {
        this.pokemon.set(pokemon);
      }
    );
  }

  ngOnDestroy(): void {
    this.serviceSubscription?.unsubscribe();
    this.loadingSubscription?.unsubscribe();
  }
}
