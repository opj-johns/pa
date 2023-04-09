import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCartTableComponent } from './purchase-cart-table.component';

describe('PurchaseCartTableComponent', () => {
  let component: PurchaseCartTableComponent;
  let fixture: ComponentFixture<PurchaseCartTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseCartTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseCartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
