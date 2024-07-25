import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTwoFactorComponent } from './manage-two-factor.component';

describe('ManageTwoFactorComponent', () => {
  let component: ManageTwoFactorComponent;
  let fixture: ComponentFixture<ManageTwoFactorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTwoFactorComponent]
    });
    fixture = TestBed.createComponent(ManageTwoFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
