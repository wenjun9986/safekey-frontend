import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerRoute = "/register";
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
      this.loginForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
      });
  }

  get email() {
    return this.loginForm.get('email');
  }

  hasError(controlName: string, errorName: string) {
    const control = this.loginForm.controls[controlName];
    return control.hasError(errorName);
  }



  ngOnInit(): void {
    // TODO: check how the remember email
  }

  async submit() {
    console.log(this.loginForm.value);
    await this.router.navigate(["login"]);
  }
}
