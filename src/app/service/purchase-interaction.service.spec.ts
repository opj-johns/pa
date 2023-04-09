import { TestBed } from '@angular/core/testing';

import { PurchaseInteractionService } from './purchase-interaction.service';

describe('PurchaseInteractionService', () => {
  let service: PurchaseInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
