import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VaultEncryptionService} from "../../../services/vault-encryption.service";
import {MasterKeyService} from "../../../services/master-key.service";
import {VaultService} from "../../../vault.service";
import {VaultUpdateService} from "../../../services/vault-update.service";


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
      private vaultEncryptionService: VaultEncryptionService,
      private masterKey: MasterKeyService,
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

    async getMasterKey() {
        const email = "test@test.com";
        const password = "testing_purpose";
        const kdfConfig = {iterations: 600000, keyLength: 256};
        return await this.masterKey.generateMasterKey(email, password, kdfConfig);
    }

    async submitForm() {
      const serializedData = JSON.stringify(this.updatedData);
      try {
        const masterKey = await this.getMasterKey();
        const encryptedData = await this.vaultEncryptionService.encryptVault(serializedData, masterKey);
        this.vaultService.updateVaultItem(this.data.item_id, "1003", encryptedData).subscribe(
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
