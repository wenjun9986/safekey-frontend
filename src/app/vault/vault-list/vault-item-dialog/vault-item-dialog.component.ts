import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VaultEncryptionService} from "../../../services/vault-encryption.service";
import {VaultService} from "../../../vault.service";
import {VaultUpdateService} from "../../../services/vault-update.service";
import {CryptoFunctionService} from "../../../services/crypto-function.service";


@Component({
  selector: 'app-vault-item-dialog',
  templateUrl: './vault-item-dialog.component.html',
  styleUrls: ['./vault-item-dialog.component.scss']
})
export class VaultItemDialogComponent{

    showSaveButton = false;
    isFormValid = false;
    updatedData: any;

    constructor(
      private vaultService: VaultService,
      private cryptoService: CryptoFunctionService,
      private vaultEncryptionService: VaultEncryptionService,
      private vaultUpdateService: VaultUpdateService,
      public dialogRef: MatDialogRef<VaultItemDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }

    handleFormChanged(isChanged: boolean): void {
        this.showSaveButton = isChanged;
    }

    handleFormValidity(isValid: boolean): void {
        this.isFormValid = isValid;
    }

    handleFormDataSubmit(formData: any): void {
        this.updatedData = formData;
    }

    async submitForm() {
      const serializedData = JSON.stringify(this.updatedData);
      try {
        const { masterKey, userId } = await chrome.storage.local.get(['masterKey', 'userId']);
        const masterKeyArray = new Uint8Array(this.cryptoService.base64ToArrayBuffer(masterKey));
        const encryptedData = await this.vaultEncryptionService.encryptVault(serializedData, masterKeyArray);
        this.vaultService.updateVaultItem(this.data.item_id, userId , encryptedData).subscribe(
          (response: any) => {
            if (response && response.data) {
              this.vaultUpdateService.notifyVaultUpdate();
              this.dialogRef.close(response);
            }
          },(error: any) => {
            this.dialogRef.close(error);
          });
      } catch (error) {
        this.dialogRef.close(error);
      }
    }

    closeDialog(): void {
      this.dialogRef.close();
    }
}
