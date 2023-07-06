import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePaymentHistoryTableComponent } from './purchase-payment-history-table.component';

describe('PurchasePaymentHistoryTableComponent', () => {
  let component: PurchasePaymentHistoryTableComponent;
  let fixture: ComponentFixture<PurchasePaymentHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasePaymentHistoryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasePaymentHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
