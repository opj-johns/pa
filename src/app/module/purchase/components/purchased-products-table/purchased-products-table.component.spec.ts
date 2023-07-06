import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedProductsTableComponent } from './purchased-products-table.component';

describe('PurchasedProductsTableComponent', () => {
  let component: PurchasedProductsTableComponent;
  let fixture: ComponentFixture<PurchasedProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasedProductsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasedProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
