import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{

  email: string = '';
  initial: string = '';

  constructor(
    private router: Router,
  ) { }

  async ngOnInit() {
    await this.initializeEmail();
  }

  async initializeEmail() {
    const {email} = await chrome.storage.local.get(['email']);
    this.email = email;
    this.initial = email.charAt(0).toUpperCase();
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
