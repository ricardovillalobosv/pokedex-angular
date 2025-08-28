import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonAbout } from './pokemon-about';

describe('PokemonAbout', () => {
  let component: PokemonAbout;
  let fixture: ComponentFixture<PokemonAbout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonAbout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonAbout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
