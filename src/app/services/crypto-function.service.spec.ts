import { TestBed } from '@angular/core/testing';

import { CryptoFunctionService } from './crypto-function.service';

describe('CryptoFunctionService', () => {
  let service: CryptoFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
