import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteVaultComponent } from './note-vault.component';

describe('NoteVaultComponent', () => {
  let component: NoteVaultComponent;
  let fixture: ComponentFixture<NoteVaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteVaultComponent]
    });
    fixture = TestBed.createComponent(NoteVaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
