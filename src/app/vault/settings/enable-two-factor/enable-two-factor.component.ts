import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VaultService} from "../../../vault.service";
import {PopupMessageService} from "../../../services/popup-message.service";
import {OtpInputFormComponent} from "../../../otp-input-form/otp-input-form/otp-input-form.component";
@Component({
  selector: 'app-enable-two-factor',
  templateUrl: './enable-two-factor.component.html',
  styleUrls: ['./enable-two-factor.component.scss']
})

export class EnableTwoFactorComponent implements OnInit{
    @ViewChild('stepper') stepper: any;
    @ViewChild(OtpInputFormComponent) otpInputFormComponent!: OtpInputFormComponent;
    qrCodeUrl: string = '';
    secret: string = '';
    isOTPVerified: boolean = false;

  constructor(
      private vaultService: VaultService,
      private popupMessageService: PopupMessageService,
      private changeDetectorRef: ChangeDetectorRef,
      public dialogRef: MatDialogRef<EnableTwoFactorComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
    this.vaultService.generate2FASecret(this.data.email).subscribe(
        (response: any) => {
          if (response && response.data) {
              this.qrCodeUrl = response.data.qr_code_url;
              this.secret = response.data.secret;
          }
        },(error: any) => {
          this.popupMessageService.popupMsg('An unexpected error occurred.');
        });
  }

    verifyOtp(otp: string) {
      this.vaultService.enable2FA(this.data.user_id, otp, this.secret).subscribe(
        (response: any) => {
            if (response && response.data) {
                this.isOTPVerified = true;
                this.changeDetectorRef.detectChanges();
                this.stepper.next();
            }
        },(error: any) => {
            if (error.message === 'Invalid OTP') {
                this.popupMessageService.popupMsg('Invalid OTP. Please try again');
                this.otpInputFormComponent.resetForm();
            }
            else {
                this.popupMessageService.popupMsg('An unexpected error occurred.');
            }
        });
    }

    closeDialog() {
      this.dialogRef.close();
    }
}
