import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-input-form',
  templateUrl: './otp-input-form.component.html',
  styleUrls: ['./otp-input-form.component.scss']
})
export class OtpInputFormComponent implements OnInit {

  otpForm: FormGroup;
  otpControlKeys: string[];

  @Output() otpComplete = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.otpForm = this.fb.group({
      '0': ['', [Validators.required, Validators.maxLength(1)]],
      '1': ['', [Validators.required, Validators.maxLength(1)]],
      '2': ['', [Validators.required, Validators.maxLength(1)]],
      '3': ['', [Validators.required, Validators.maxLength(1)]],
      '4': ['', [Validators.required, Validators.maxLength(1)]],
      '5': ['', [Validators.required, Validators.maxLength(1)]]
    });
    this.otpControlKeys = Object.keys(this.otpForm.controls);
  }

  ngOnInit(): void {
    this.otpForm.valueChanges.subscribe(() => {
      this.checkAndEmitOtp();
    });
  }

  onInput(target: any, index: number): void {
    const val = target.value;
    if (isNaN(val)) {
      target.value = "";
      return;
    }
    if (val != "") {
      const nextInput = document.getElementById(`input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onKeyUp(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      const previousInput = document.getElementById(`input-${index - 1}`);
      if (previousInput) {
        previousInput.focus();
      }
    }
  }

  checkAndEmitOtp() {
    if(this.otpForm.valid) {
      const otp = Object.values(this.otpForm.controls).map(control => control.value).join('');
      if (otp.length === 6) {
        this.otpComplete.emit(otp);
      }
    }
  }

  resetForm() {
    this.otpForm.reset();
    const firstInput = document.getElementById('input-0') as HTMLInputElement;
    if (firstInput) {
      firstInput.focus();
    }
  }
}
