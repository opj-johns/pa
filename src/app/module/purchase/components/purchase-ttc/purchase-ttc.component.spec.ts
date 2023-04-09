import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseTTCComponent } from './purchase-ttc.component';

describe('PurchaseTTCComponent', () => {
  let component: PurchaseTTCComponent;
  let fixture: ComponentFixture<PurchaseTTCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseTTCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseTTCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
