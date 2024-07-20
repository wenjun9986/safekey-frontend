import { TestBed } from '@angular/core/testing';

import { VaultUpdateService } from './vault-update.service';

describe('VaultUpdateService', () => {
  let service: VaultUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaultUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
