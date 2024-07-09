import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  showPassword = false;

  formGroup = this.formBuilder.group(
    {
      email: ["", [Validators.required, Validators.email]],
      masterPassword: ["", [Validators.required, Validators.minLength(12)]],
      confirmMasterPassword: ["", [Validators.required, Validators.minLength(12)]]}
  );

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  submit(){
    console.log(this.formGroup.value);
  }

  constructor(
    private formBuilder: FormBuilder
  ) {

  }
  ngOnInit(): void {
  }


}
