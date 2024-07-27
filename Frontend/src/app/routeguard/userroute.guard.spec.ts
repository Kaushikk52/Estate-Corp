import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userrouteGuard } from './userroute.guard';

describe('userrouteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userrouteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
