import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VaultService} from "../../vault.service";
import {PopupMessageService} from "../../services/popup-message.service";
import {MasterKeyService} from "../../services/master-key.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{
  showPassword = false;
  registerForm: FormGroup;
  showConfirmPassword = false;

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private vaultService: VaultService,
      private popupMessageService: PopupMessageService,
      private masterKeyService: MasterKeyService,
      private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(12)]],
      confirmPassword: ['', Validators.required]
    },{
      validator: this.matchPassword('password', 'confirmPassword')
    });
    this.route.queryParams.subscribe(params => {
       const email = params['email'];
       if (email) {
         this.registerForm.patchValue({ email });
       }
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

  private async generateMasterKeyHash() {
    const {email, password} = this.registerForm.value;
    const kdfConfig = {iterations: 600000, keyLength: 256};
    const masterKey = await this.masterKeyService.generateMasterKey(email, password, kdfConfig);
    const newKDFConfig = {iterations: 1, keyLength: 256};
    return await this.masterKeyService.generateMasterPasswordHash(masterKey, password, newKDFConfig);
  }

  async registerUser() {
    const {email} = this.registerForm.value;
    const masterPasswordHash = await this.generateMasterKeyHash();
    this.vaultService.registerUser(email, masterPasswordHash).subscribe(
        (response: any) => {
            this.popupMessageService.popupMsg("User registered successfully. Redirecting back to the Home Page");
            this.router.navigate(["home"]);
        },
        (error: any) => {
          if (error.status === 409) {
            this.popupMessageService.popupMsg("User already exists");
          } else {
            this.popupMessageService.popupMsg("Error registering user");
          }
        }
    );
  }
}
