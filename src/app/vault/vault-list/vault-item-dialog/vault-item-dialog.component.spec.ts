import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultItemDialogComponent } from './vault-item-dialog.component';

describe('VaultItemDialogComponent', () => {
  let component: VaultItemDialogComponent;
  let fixture: ComponentFixture<VaultItemDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaultItemDialogComponent]
    });
    fixture = TestBed.createComponent(VaultItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
