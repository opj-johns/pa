import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedProducsDialogComponent } from './ordered-producs-dialog.component';

describe('OrderedProducsDialogComponent', () => {
  let component: OrderedProducsDialogComponent;
  let fixture: ComponentFixture<OrderedProducsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedProducsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderedProducsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
