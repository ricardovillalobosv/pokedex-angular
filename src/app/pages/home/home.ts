import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonCard } from '@components/pokemon-card/pokemon-card';
import { Pokemon } from '@core/models/pokemon.model';
import { PokemonServices } from '@core/services/pokemon-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [PokemonCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export default class Home implements OnInit, OnDestroy {
  private servicesSubscription: Subscription | undefined;
  private pokemonServices = inject(PokemonServices);

  private offset = signal<number>(0);
  private limit = signal<number>(15);
  private error = signal<string | null>(null);

  public loading = signal<boolean>(false);
  protected pokemons = signal<Pokemon[]>([]);

  ngOnInit(): void {
    this.getPokemons();
  }

  ngOnDestroy(): void {
    this.servicesSubscription?.unsubscribe();
  }

  getPokemons() {
    this.loading.set(true);
    this.servicesSubscription = this.pokemonServices
      .getPokemons(this.offset(), this.limit())
      .subscribe({
        next: (pokemons: Pokemon[]) => {
          this.pokemons.update((old) => [...old, ...pokemons]);
          this.offset.update((oldValue) => this.limit() + oldValue);
        },
        error: (error) => {
          this.error.set(error);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
  }

  viewMore() {
    this.getPokemons();
  }
}
