import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EnableTwoFactorComponent} from "./enable-two-factor/enable-two-factor.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{

  userId: string = '';
  email: string = '';
  initial: string = '';

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    await this.initializeEmail();
  }

  async initializeEmail() {
    const {email, userId} = await chrome.storage.local.get(['email', 'userId']);
    this.userId = userId;
    this.email = email;
    this.initial = email.charAt(0).toUpperCase();
  }

  openDialog(){
    const dialogRef = this.dialog.open(EnableTwoFactorComponent,{
      data: {user_id: this.userId, email: this.email},
      /*disableClose: true,*/
      width: '350px',
      maxWidth: '100vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("asd");
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
