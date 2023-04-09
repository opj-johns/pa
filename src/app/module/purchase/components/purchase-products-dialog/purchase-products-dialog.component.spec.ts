import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseProductsDialogComponent } from './purchase-products-dialog.component';

describe('PurchaseProductsDialogComponent', () => {
  let component: PurchaseProductsDialogComponent;
  let fixture: ComponentFixture<PurchaseProductsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseProductsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseProductsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
