import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginFormComponent} from "./login-form/login-form.component";
import {PaymentFormComponent} from "./payment-form/payment-form.component";
import {NoteFormComponent} from "./note-form/note-form.component";
import {VaultEncryptionService} from "../../services/vault-encryption.service";
import {PopupMessageService} from "../../services/popup-message.service";
import {VaultService} from "../../vault.service";
import {CryptoFunctionService} from "../../services/crypto-function.service";

@Component({
  selector: 'app-form-manager',
  templateUrl: './form-manager.component.html',
  styleUrls: ['./form-manager.component.scss']
})
export class FormManagerComponent implements OnInit{

  @ViewChild(LoginFormComponent) loginFormComponent?: LoginFormComponent
  @ViewChild(PaymentFormComponent) paymentFormComponent?: PaymentFormComponent
  @ViewChild(NoteFormComponent) noteFormComponent?: NoteFormComponent

  typeForm: FormGroup;
  currentType: string = "";
  isFormValid: boolean = false;
  masterKey: Uint8Array = new Uint8Array();
  userId: string = '';

  constructor(
      private fb: FormBuilder,
      private cryptoService: CryptoFunctionService,
      private vaultEncryption: VaultEncryptionService,
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

  ngOnInit() {
    chrome.storage.local.get(['masterKey', 'userId'], (result) => {
      if (result) {
        this.masterKey = new Uint8Array(this.cryptoService.base64ToArrayBuffer(result['masterKey']));
        this.userId = result['userId'];
      }
    });
  }

  hasError(controlName: string, errorName: string) {
    const control = this.typeForm.controls[controlName];
    return control.hasError(errorName);
  }

  updateFormValidity(isValid: boolean) {
    this.isFormValid = isValid;
  }

  async submitCurrentForm() {
    let formData: any;

    if (this.currentType === 'login' && this.loginFormComponent) {
      formData = this.loginFormComponent.loginForm.value;
    } else if (this.currentType === 'payment_method' && this.paymentFormComponent) {
      formData = this.paymentFormComponent.paymentForm.value;
    } else if (this.currentType === 'note' && this.noteFormComponent) {
      formData = this.noteFormComponent.noteForm.value;
    }


    if (formData) {
      const serializedData = JSON.stringify(formData);
      try {
        const encryptedData = await this.vaultEncryption.encryptVault(serializedData, this.masterKey);
        this.vaultService.insertVaultItem(this.userId, this.currentType, encryptedData).subscribe(
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


