import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminrouteGuard } from './adminroute.guard';

describe('adminrouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminrouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
