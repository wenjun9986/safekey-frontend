import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PopupMessageService} from "../../../services/popup-message.service";
import {VaultService} from "../../../vault.service";

@Component({
  selector: 'app-two-factor-login',
  templateUrl: './two-factor-login.component.html',
  styleUrls: ['./two-factor-login.component.scss']
})
export class TwoFactorLoginComponent {

  constructor(
      private vaultService: VaultService,
      private popupMessageService: PopupMessageService,
      public dialogRef: MatDialogRef<TwoFactorLoginComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  verifyOtp(otp: string) {
    this.vaultService.verify2FA(this.data.user_id, otp).subscribe(
        (response: any) => {
        if (response && response.data) {
          this.dialogRef.close(response);
        }
      },(error: any) => {
        if (error.message === 'Invalid OTP') {
          this.popupMessageService.popupMsg('Invalid OTP. Please try again');
        }
        else {
          this.popupMessageService.popupMsg('An unexpected error occurred.');
        }
      });

  }

  closeDialog(){
    this.dialogRef.close();
  }

}
