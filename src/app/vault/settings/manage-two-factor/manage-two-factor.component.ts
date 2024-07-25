import {Component, Inject, OnInit} from '@angular/core';
import {VaultService} from "../../../vault.service";
import {PopupMessageService} from "../../../services/popup-message.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-manage-two-factor',
  templateUrl: './manage-two-factor.component.html',
  styleUrls: ['./manage-two-factor.component.scss']
})
export class ManageTwoFactorComponent implements OnInit{

  qrCodeUrl: string = '';
  secret: string = '';
  constructor(
      private vaultService: VaultService,
      private popupMessageService: PopupMessageService,
      public dialogRef: MatDialogRef<ManageTwoFactorComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.vaultService.get2FADetails(this.data.user_id).subscribe(
      (response: any) => {
          if (response && response.data) {
              this.qrCodeUrl = response.data.qr_code_url;
              this.secret = response.data.secret;
          }
      },(error: any) => {
          this.popupMessageService.popupMsg('An unexpected error occurred.');
      });
  }

  disable2FA() {
    this.vaultService.disable2FA(this.data.user_id).subscribe(
      (response: any) => {
          if (response && response.data) {
              this.dialogRef.close(response);
          }
      },(error: any) => {
          this.popupMessageService.popupMsg('An unexpected error occurred.');
      });
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
