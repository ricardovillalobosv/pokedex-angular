import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCardPokemonPage } from './skeleton-card-pokemon-page';

describe('SkeletonCardPokemonPage', () => {
  let component: SkeletonCardPokemonPage;
  let fixture: ComponentFixture<SkeletonCardPokemonPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonCardPokemonPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonCardPokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
