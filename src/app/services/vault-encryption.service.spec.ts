import { TestBed } from '@angular/core/testing';

import { VaultEncryptionService } from './vault-encryption.service';

describe('VaultEncryptionService', () => {
  let service: VaultEncryptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaultEncryptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
