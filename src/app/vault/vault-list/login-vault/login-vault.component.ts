import {Component, Input, OnInit} from '@angular/core';
import {PopupMessageService} from "../../../services/popup-message.service";

@Component({
  selector: 'app-login-vault',
  templateUrl: './login-vault.component.html',
  styleUrls: ['./login-vault.component.scss']
})
export class LoginVaultComponent implements OnInit{
  @Input() item: any;
  decryptedData: any;

  constructor(
      private popupMessage: PopupMessageService,
  ){

  }

  ngOnInit(): void {
    this.decryptedData = this.item.decrypted_data;
  }

  redirectTo(): void{
    let url = this.decryptedData.url;
    if (url) {
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://www.' + url;
      }
      window.open(url, '_blank');
    } else {
      this.popupMessage.popupMsg('No URL provided');
    }
  }

  copyToClipboard(content: string) {
    navigator.clipboard.writeText(content);
    this.popupMessage.popupMsg('Content copied to clipboard');
  }

}
