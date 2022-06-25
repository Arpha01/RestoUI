import { TestBed } from '@angular/core/testing';

import { HttpCredentialsInterceptor } from './http-credentials.interceptor';

describe('HttpCredentialsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpCredentialsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpCredentialsInterceptor = TestBed.inject(HttpCredentialsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
