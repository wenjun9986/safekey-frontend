import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableTwoFactorComponent } from './enable-two-factor.component';

describe('EnableTwoFactorComponent', () => {
  let component: EnableTwoFactorComponent;
  let fixture: ComponentFixture<EnableTwoFactorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnableTwoFactorComponent]
    });
    fixture = TestBed.createComponent(EnableTwoFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
