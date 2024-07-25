import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EnableTwoFactorComponent} from "./enable-two-factor/enable-two-factor.component";
import {MatDialog} from "@angular/material/dialog";
import {VaultService} from "../../vault.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PopupMessageService} from "../../services/popup-message.service";
import {TwoFactorLoginComponent} from "../../auth/login/two-factor-login/two-factor-login.component";
import {ManageTwoFactorComponent} from "./manage-two-factor/manage-two-factor.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{

  userId: string = '';
  email: string = '';
  initial: string = '';
  is2FAEnabled: boolean = false;
  timeoutForm: FormGroup;
  showSaveButton: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private vaultService: VaultService,
    private popupMessageService: PopupMessageService,
  ) {
    this.timeoutForm = this.fb.group({
      expirationTime: [''],
    });
  }

  async ngOnInit() {
    await this.loadUserData();
    this.loadUserSetting();
    this.timeoutForm.valueChanges.subscribe(() => {
      this.showSaveButton = true;
    });
  }

  async loadUserData(){
    const {email, userId} = await chrome.storage.local.get(['email', 'userId']);
    this.userId = userId;
    this.email = email;
    this.initial = email.charAt(0).toUpperCase();
  }

  loadUserSetting() {
    this.vaultService.getUserConfigs(this.userId).subscribe(
        (response: any) => {
          if (response && response.data) {
            this.is2FAEnabled = response.data['2FA'] === 'Enabled';
            this.timeoutForm.patchValue({expirationTime: response.data['expiration']}, {emitEvent: false});
          }
        },(error: any) => {
          this.popupMessageService.popupMsg('An unexpected error occurred.');
        });
  }

  openVerifyDialog(){
    const dialogRef = this.dialog.open(TwoFactorLoginComponent,{
      data: {user_id: this.userId, email: this.email},
      disableClose: true,
      width: '350px',
      maxWidth: '100vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.openManageDialog();
      }
    });
  }

  openManageDialog(){
    const dialogRef = this.dialog.open(ManageTwoFactorComponent,{
        data: {user_id: this.userId},
        disableClose: true,
        width: '350px',
        maxWidth: '100vw'
        });

    dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.loadUserSetting();
        }
    });
  }

  openSetupDialog(){
    const dialogRef = this.dialog.open(EnableTwoFactorComponent,{
      data: {user_id: this.userId, email: this.email},
      disableClose: true,
      width: '350px',
      maxWidth: '100vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadUserSetting();
      }
    });
  }

  saveTimeout(){
    this.vaultService.updateVaultTimeout(this.userId, this.timeoutForm.value.expirationTime).subscribe(
        (response: any) => {
          this.popupMessageService.popupMsg('Timeout Updated Successfully');
          this.showSaveButton = false;
        },(error: any) => {
          this.popupMessageService.popupMsg('An unexpected error occurred.');
        });
  }


  logout() {
    chrome.storage.local.clear().then(r => {
      this.router.navigate(['/home']);
    })
  }

  lock(){
    chrome.storage.local.remove(['JWTToken', 'masterKey', 'userId']).then(r => {
      this.router.navigate(['/login']);
    });
  }
}
