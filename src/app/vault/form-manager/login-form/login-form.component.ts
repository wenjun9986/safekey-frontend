import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  DefaultPasswordGenerationOptions,
  PasswordGenerationOptions,
  PasswordPassphraseService
} from "../../../services/password-passphrase.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() formDataSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() formValid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() formChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() formData: any;

  loginForm: FormGroup;
  showPassword = false;
  initialState: any;
  passwordOptions: PasswordGenerationOptions = {...DefaultPasswordGenerationOptions} as PasswordGenerationOptions;

  constructor(
      private fb: FormBuilder,
      private passwordPassphraseService: PasswordPassphraseService,
  ) {
    this.loginForm = this.fb.group({
      title: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      url: [''],
    });
  }

  ngOnInit() {
    if (this.formData) {
      this.loginForm.patchValue(this.formData);
      this.initialState = this.loginForm.value; // Capture initial state
    }

    this.loginForm.valueChanges.subscribe(() => {
      const isFormDirty = JSON.stringify(this.initialState) !== JSON.stringify(this.loginForm.value);
      this.formValid.emit(this.loginForm.valid);
      this.formChanged.emit(isFormDirty);
      if (this.loginForm.valid) {
        this.formDataSubmit.emit(this.loginForm.value);
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async generatePassword() {
    let password = await this.passwordPassphraseService.generatePassword(this.passwordOptions);
    this.loginForm.get('password')?.setValue(password);
  }

  hasError(controlName: string, errorName: string) {
    const control = this.loginForm.controls[controlName];
    return control.hasError(errorName);
  }
}
