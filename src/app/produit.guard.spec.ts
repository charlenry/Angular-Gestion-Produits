import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { produitGuard } from './produit.guard';

describe('produitGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => produitGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
