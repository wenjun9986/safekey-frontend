import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formGroup = this.formBuilder.group({
    email:["", [Validators.required, Validators.email]]
  });
    constructor(
      private formBuilder: FormBuilder
    ) {}

  ngOnInit(): void {
  }

  submit(){
      console.log(this.formGroup.value);
  }


}
