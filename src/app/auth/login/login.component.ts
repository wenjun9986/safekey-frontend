import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MasterKeyService} from "../../services/master-key.service";
import {VaultService} from "../../vault.service";
import {PopupMessageService} from "../../services/popup-message.service";

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
      private popupMessageService: PopupMessageService,
      private masterKeyService: MasterKeyService,
      private vaultService: VaultService,
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

  get loggedEmail() {
    return this.loginForm.value.email;
  }

  hasError(controlName: string, errorName: string) {
    const control = this.loginForm.controls[controlName];
    return control.hasError(errorName);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  private async generateMasterKeyHash() {
    const {email, password} = this.loginForm.value;
    const kdfConfig = {iterations: 600000, keyLength: 256};
    const masterKey = await this.masterKeyService.generateMasterKey(email, password, kdfConfig);
    const newKDFConfig = {iterations: 1, keyLength: 256};
    return await this.masterKeyService.generateMasterPasswordHash(masterKey, password, newKDFConfig);
  }

  async loginUser() {
    const localHash = await this.generateMasterKeyHash();
    this.vaultService.loginUser(this.loggedEmail).subscribe(
        (response: any) => {
          if (response.data.master_password_hash === localHash) {
            this.router.navigate(['/tabs/vault-list']);
          } else {
            this.popupMessageService.popupMsg("Invalid Email and Password");
          }
        }, (error: any) => {
            this.popupMessageService.popupMsg("Problems occurred while attempting to log in.");
        }
    )
  }
}


//TODO: Move the authentication logic to the server side
