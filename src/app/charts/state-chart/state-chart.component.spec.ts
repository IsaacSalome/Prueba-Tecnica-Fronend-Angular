import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateChartComponent } from './state-chart.component';

describe('StateChartComponent', () => {
  let component: StateChartComponent;
  let fixture: ComponentFixture<StateChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
