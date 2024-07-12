import { TestBed } from '@angular/core/testing';

import { PasswordPassphraseService } from './password-passphrase.service';

describe('PasswordPassphraseService', () => {
  let service: PasswordPassphraseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordPassphraseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
