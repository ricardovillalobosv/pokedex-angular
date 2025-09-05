import { TestBed } from '@angular/core/testing';

import { SharedPokemonData } from './shared-pokemon-data';

describe('SharedPokemonData', () => {
  let service: SharedPokemonData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedPokemonData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
