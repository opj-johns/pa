import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSalesChartComponent } from './expense-sales-chart.component';

describe('ExpenseSalesChartComponent', () => {
  let component: ExpenseSalesChartComponent;
  let fixture: ComponentFixture<ExpenseSalesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseSalesChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseSalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
