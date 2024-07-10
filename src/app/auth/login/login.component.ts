import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      if (email) {
        this.loginForm.patchValue({ email });
      }
    });
  }
  hasError(controlName: string, errorName: string) {
    const control = this.loginForm.controls[controlName];
    return control.hasError(errorName);
  }

  get loggedEmail() {
    return this.loginForm.value.email;
  }

  loginUser(){
    // TODO : implement the login function and navigate to vault page
    this.router.navigate(["tabs"]);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
