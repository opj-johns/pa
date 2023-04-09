import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePaymentHistoryDialogclearComponent } from './purchase-payment-history-dialogclear.component';

describe('PurchasePaymentHistoryDialogclearComponent', () => {
  let component: PurchasePaymentHistoryDialogclearComponent;
  let fixture: ComponentFixture<PurchasePaymentHistoryDialogclearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasePaymentHistoryDialogclearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasePaymentHistoryDialogclearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
