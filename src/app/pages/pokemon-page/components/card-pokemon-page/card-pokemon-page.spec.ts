import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPokemonPage } from './card-pokemon-page';

describe('CardPokemonPage', () => {
  let component: CardPokemonPage;
  let fixture: ComponentFixture<CardPokemonPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPokemonPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
