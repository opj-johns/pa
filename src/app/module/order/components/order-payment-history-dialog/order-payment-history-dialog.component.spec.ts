import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPaymentHistoryDialogComponent } from './order-payment-history-dialog.component';

describe('OrderPaymentHistoryDialogComponent', () => {
  let component: OrderPaymentHistoryDialogComponent;
  let fixture: ComponentFixture<OrderPaymentHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPaymentHistoryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPaymentHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
