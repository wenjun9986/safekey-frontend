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
  emailForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
      this.emailForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
      });
  }

  get email() {
    return this.emailForm.get('email');
  }

  hasError(controlName: string, errorName: string) {
    const control = this.emailForm.controls[controlName];
    return control.hasError(errorName);
  }

  ngOnInit(): void {
    // TODO: check how the remember email
  }

  async submit() {
    console.log(this.emailForm.value);
    await this.router.navigate(["login"], { queryParams: { email: this.emailForm.value.email } });
  }
}
