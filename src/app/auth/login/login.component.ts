import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MasterKeyService} from "../../services/master-key.service";
import {VaultService} from "../../vault.service";
import {PopupMessageService} from "../../services/popup-message.service";
import {CryptoFunctionService} from "../../services/crypto-function.service";
import {TwoFactorLoginComponent} from "./two-factor-login/two-factor-login.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  loginForm: FormGroup;
  showPassword = false;
  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private cryptoService: CryptoFunctionService,
      private popupMessageService: PopupMessageService,
      private masterKeyService: MasterKeyService,
      private vaultService: VaultService,
      private router: Router,
      private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      if (email) {
        this.loginForm.patchValue({ email });
      } else {
        chrome.storage.local.get(['email'], (result) => {
          if (result['email']) {
            this.loginForm.patchValue({email: result['email']});
          }
        });
      }
    });
  }

  hasError(controlName: string, errorName: string) {
    const control = this.loginForm.controls[controlName];
    return control.hasError(errorName);
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  private async generateMasterKey(){
    const {email, password} = this.loginForm.value;
    const kdfConfig = {iterations: 600000, keyLength: 256};
    return await this.masterKeyService.generateMasterKey(email, password, kdfConfig);
  }

  private async generateMasterKeyHash(masterKey: Uint8Array) {
    const password = this.loginForm.value.password;
    const newKDFConfig = {iterations: 1, keyLength: 256};
    return await this.masterKeyService.generateMasterPasswordHash(masterKey, password, newKDFConfig);
  }

  async loginUser() {
    const masterKey = await this.generateMasterKey();
    const localHash = await this.generateMasterKeyHash(masterKey);
    this.vaultService.loginUser(this.loginForm.value.email, localHash).subscribe(
      (response: any) => {
        if (response.data.message === '2FA Enabled') {
          const dialogRef = this.dialog.open(TwoFactorLoginComponent, {
            data: {user_id: response.data.user_id, email: this.loginForm.value.email},
            width: '350px',
            maxWidth: '100vw'
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              chrome.storage.local.set({
                'JWTToken': result.data.JWTToken,
                'userId': result.data.user_id,
                'email': this.loginForm.value.email,
                'masterKey': this.cryptoService.arrayBufferToBase64(masterKey),
              })
              this.router.navigate(['/tabs/vault-list']);
            }
          });
        } else {
            chrome.storage.local.set({
                'JWTToken': response.data.JWTToken,
                'userId': response.data.user_id,
                'email': this.loginForm.value.email,
                'masterKey': this.cryptoService.arrayBufferToBase64(masterKey),
            })
            this.router.navigate(['/tabs/vault-list']);
        }
      }, (error: any) => {
          this.popupMessageService.popupMsg("Problems occurred while attempting to log in.");
      }
    )
  }
}
