import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentVaultComponent } from './payment-vault.component';

describe('PaymentVaultComponent', () => {
  let component: PaymentVaultComponent;
  let fixture: ComponentFixture<PaymentVaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentVaultComponent]
    });
    fixture = TestBed.createComponent(PaymentVaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
