import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpInputFormComponent } from './otp-input-form.component';

describe('OtpInputFormComponent', () => {
  let component: OtpInputFormComponent;
  let fixture: ComponentFixture<OtpInputFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpInputFormComponent]
    });
    fixture = TestBed.createComponent(OtpInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
