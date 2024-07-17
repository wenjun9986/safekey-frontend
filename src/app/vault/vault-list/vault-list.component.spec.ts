import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultListComponent } from './vault-list.component';

describe('VaultListComponent', () => {
  let component: VaultListComponent;
  let fixture: ComponentFixture<VaultListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaultListComponent]
    });
    fixture = TestBed.createComponent(VaultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
