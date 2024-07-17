import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultManagerComponent } from './form-manager.component';

describe('VaultManagerComponent', () => {
  let component: VaultManagerComponent;
  let fixture: ComponentFixture<VaultManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaultManagerComponent]
    });
    fixture = TestBed.createComponent(VaultManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
