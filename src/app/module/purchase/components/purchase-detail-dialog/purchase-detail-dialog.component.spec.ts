import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDetailDialogComponent } from './purchase-detail-dialog.component';

describe('PurchaseDetailDialogComponent', () => {
  let component: PurchaseDetailDialogComponent;
  let fixture: ComponentFixture<PurchaseDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseDetailDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
