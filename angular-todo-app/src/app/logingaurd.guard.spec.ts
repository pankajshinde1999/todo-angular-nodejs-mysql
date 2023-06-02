import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logingaurdGuard } from './logingaurd.guard';

describe('logingaurdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logingaurdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
