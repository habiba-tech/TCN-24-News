import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakingTicker } from './breaking-ticker';

describe('BreakingTicker', () => {
  let component: BreakingTicker;
  let fixture: ComponentFixture<BreakingTicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakingTicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakingTicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
