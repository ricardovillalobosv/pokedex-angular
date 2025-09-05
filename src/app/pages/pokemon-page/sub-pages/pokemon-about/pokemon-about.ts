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

@Component({
  selector: 'app-pokemon-about',
  imports: [UpperCasePipe],
  templateUrl: './pokemon-about.html',
  styleUrl: './pokemon-about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonAbout implements OnInit, OnDestroy {
  readonly pokemon = signal<Pokemon>({});

  private sharedPokemonDataService = inject(SharedPokemonDataService);

  private serviceSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.serviceSubscription = this.sharedPokemonDataService.pokemon$.subscribe(
      {
        next: (pokemon) => {
          this.pokemon.set(pokemon);
        },
      }
    );
  }

  ngOnDestroy(): void {
    this.serviceSubscription?.unsubscribe();
  }
}
