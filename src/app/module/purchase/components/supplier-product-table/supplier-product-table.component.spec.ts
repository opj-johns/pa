import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProductTableComponent } from './supplier-product-table.component';

describe('SupplierProductTableComponent', () => {
  let component: SupplierProductTableComponent;
  let fixture: ComponentFixture<SupplierProductTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierProductTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
