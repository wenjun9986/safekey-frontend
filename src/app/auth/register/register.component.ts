import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  showPassword = false;
  registerForm: FormGroup;
  showConfirmPassword = false;

  constructor(
      private fb: FormBuilder,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(12)]],
      confirmPassword: ['', Validators.required]
    },{
      validator: this.matchPassword('password', 'confirmPassword')
    });

  }

  hasError(controlName: string, errorName: string) {
    const control = this.registerForm.controls[controlName];
    return control.hasError(errorName);
  }

  matchPassword(password:string, confirmPassword:string){
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  registerUser(){
    // TODO: implement the functionality and navigate to the home page
    console.log(this.registerForm.value);
  }
  ngOnInit(): void {
    // TODO: maybe get the email address from the previous page
  }


}
