import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockProductTableComponent } from './stock-product-table.component';

describe('StockProductTableComponent', () => {
  let component: StockProductTableComponent;
  let fixture: ComponentFixture<StockProductTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockProductTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
