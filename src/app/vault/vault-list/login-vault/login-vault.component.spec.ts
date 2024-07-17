import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginVaultComponent } from './login-vault.component';

describe('LoginVaultComponent', () => {
  let component: LoginVaultComponent;
  let fixture: ComponentFixture<LoginVaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginVaultComponent]
    });
    fixture = TestBed.createComponent(LoginVaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
