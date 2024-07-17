import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {VaultService} from "../../vault.service";
import {PopupMessageService} from "../../services/popup-message.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  registerRoute = "/register";
  emailForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private popupMessageService: PopupMessageService,
    private vaultService: VaultService,
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
  async submit() {
    this.vaultService.findUser(this.emailForm.value.email.toLowerCase()).subscribe({
      next: (response: any) => {
        this.router.navigate(["login"], { queryParams: { email: this.emailForm.value.email.toLowerCase() } });
      },
      error: (error: any) => {
        this.popupMessageService.popupMsg("It appears your email isn't registered. Redirecting you to the registration Page");
        this.router.navigate(["register"], { queryParams: { email: this.emailForm.value.email.toLowerCase() } });
      }
    })
  }
}
