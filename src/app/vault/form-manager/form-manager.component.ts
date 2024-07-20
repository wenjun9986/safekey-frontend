import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginFormComponent} from "./login-form/login-form.component";
import {PaymentFormComponent} from "./payment-form/payment-form.component";
import {NoteFormComponent} from "./note-form/note-form.component";
import {VaultEncryptionService} from "../../services/vault-encryption.service";
import {MasterKeyService} from "../../services/master-key.service";
import {PopupMessageService} from "../../services/popup-message.service";
import {VaultService} from "../../vault.service";

@Component({
  selector: 'app-form-manager',
  templateUrl: './form-manager.component.html',
  styleUrls: ['./form-manager.component.scss']
})
export class FormManagerComponent {

  @ViewChild(LoginFormComponent) loginFormComponent?: LoginFormComponent
  @ViewChild(PaymentFormComponent) paymentFormComponent?: PaymentFormComponent
  @ViewChild(NoteFormComponent) noteFormComponent?: NoteFormComponent

  typeForm: FormGroup;
  currentType: string = "";
  isFormValid: boolean = false;

  constructor(
      private fb: FormBuilder,
      private vaultEncryption: VaultEncryptionService,
      private masterKey: MasterKeyService,
      private popupMessage: PopupMessageService,
      private vaultService: VaultService,
  ) {
    this.typeForm = this.fb.group({
      type: ['', [Validators.required]],
    });
    this.typeForm.get('type')?.valueChanges.subscribe(type => {
      this.currentType = type;
    });
  }

  hasError(controlName: string, errorName: string) {
    const control = this.typeForm.controls[controlName];
    return control.hasError(errorName);
  }

  updateFormValidity(isValid: boolean) {
    this.isFormValid = isValid;
  }

  async getMasterKey() {
    const email = "test@test.com";
    const password = "testing_purpose";
    const kdfConfig = {iterations: 600000, keyLength: 256};
    return await this.masterKey.generateMasterKey(email, password, kdfConfig);
  }

  async submitCurrentForm() {
    let formData: any;

    // Determine which form data to use based on the current type
    if (this.currentType === 'login' && this.loginFormComponent) {
      formData = this.loginFormComponent.loginForm.value;
    } else if (this.currentType === 'payment_method' && this.paymentFormComponent) {
      formData = this.paymentFormComponent.paymentForm.value;
    } else if (this.currentType === 'note' && this.noteFormComponent) {
      formData = this.noteFormComponent.noteForm.value;
    }

    //TODO: change the place where the master key is being obtained. (From the session)

    if (formData) {
      const serializedData = JSON.stringify(formData);
      try {
        const masterKey = await this.getMasterKey();
        const encryptedData = await this.vaultEncryption.encryptVault(serializedData, masterKey);
        const decryptedData = await this.vaultEncryption.decryptVault(encryptedData, masterKey);
        this.vaultService.insertVaultItem("1003", this.currentType, encryptedData).subscribe(
            (response: any) => {
              this.popupMessage.popupMsg("Vault Item Created Successfully");
              this.typeForm.reset();
              this.currentType = "";
            },
            (error: any) => {
              this.popupMessage.popupMsg("An unexpected error occurred while creating this vault.");
            }
        );
      } catch (error) {
        this.popupMessage.popupMsg("An unexpected error occurred while creating this vault.");
      }
    }
  }
}


