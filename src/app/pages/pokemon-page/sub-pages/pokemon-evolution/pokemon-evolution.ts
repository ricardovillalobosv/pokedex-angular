import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { EvolutionData } from '@core/models/evolution-result.model';
import { PokemonServices } from '@core/services/pokemon-services';
import { SharedPokemonDataService } from '@core/services/shared-pokemon-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-evolution',
  imports: [],
  templateUrl: './pokemon-evolution.html',
  styleUrl: './pokemon-evolution.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonEvolution implements OnInit, OnDestroy {
  id = signal<string>('');
  loading = signal<boolean>(false);

  sharedPokemonDataService = inject(SharedPokemonDataService);
  idSubscription: Subscription | undefined;

  pokemonServices = inject(PokemonServices);

  evolutionChain = signal<EvolutionData[]>([]);

  ngOnInit(): void {
    this.getSpeciesUrl();
  }

  ngOnDestroy(): void {
    this.idSubscription?.unsubscribe();
  }

  getSpeciesUrl() {
    this.idSubscription = this.sharedPokemonDataService.pokemon$.subscribe(
      ({ speciesUrl }) => {
        this.id.set(speciesUrl || '');
        this.getEvolutionsChain();
      }
    );
  }

  getEvolutionsChain() {
    this.loading.set(true);

    if (!this.id()) return;

    this.pokemonServices.getEvolutionChain(this.id()).subscribe({
      next: (evolutionChain) => {
        this.evolutionChain.set(evolutionChain);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
