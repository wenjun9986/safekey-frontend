import {Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {PopupMessageService} from "../../../services/popup-message.service";
import {VaultItemDialogComponent} from "../vault-item-dialog/vault-item-dialog.component";

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
      private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.decryptedData = this.item.decrypted_data;
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(VaultItemDialogComponent, {
      data: {item_id: this.item.item_id, type: this.item.type, item: this.decryptedData},
      disableClose: true,
      width: '350px',
      maxWidth: '100vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.status === 'success'){
        this.popupMessage.popupMsg('Changes has been updated successfully.');
      } else if (result) {
        this.popupMessage.popupMsg('An unexpected error occurred.');
      }
    });
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
