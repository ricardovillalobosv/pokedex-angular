import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCardPokemon } from './simple-card-pokemon';

describe('SimpleCardPokemon', () => {
  let component: SimpleCardPokemon;
  let fixture: ComponentFixture<SimpleCardPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleCardPokemon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleCardPokemon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
