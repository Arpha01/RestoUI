import { TestBed } from '@angular/core/testing';

import { BothGuardGuard } from './both-guard.guard';

describe('BothGuardGuard', () => {
  let guard: BothGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BothGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
