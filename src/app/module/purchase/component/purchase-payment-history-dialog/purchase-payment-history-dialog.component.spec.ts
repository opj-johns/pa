import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePaymentHistoryDialogComponent } from './purchase-payment-history-dialog.component';

describe('PurchasePaymentHistoryDialogComponent', () => {
  let component: PurchasePaymentHistoryDialogComponent;
  let fixture: ComponentFixture<PurchasePaymentHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasePaymentHistoryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasePaymentHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
