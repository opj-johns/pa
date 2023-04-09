import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedProductsTableComponent } from './ordered-products-table.component';

describe('OrderedProductsTableComponent', () => {
  let component: OrderedProductsTableComponent;
  let fixture: ComponentFixture<OrderedProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedProductsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderedProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
