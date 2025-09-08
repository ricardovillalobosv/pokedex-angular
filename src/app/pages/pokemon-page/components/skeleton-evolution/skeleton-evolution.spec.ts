import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonEvolution } from './skeleton-evolution';

describe('SkeletonEvolution', () => {
  let component: SkeletonEvolution;
  let fixture: ComponentFixture<SkeletonEvolution>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonEvolution]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonEvolution);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
