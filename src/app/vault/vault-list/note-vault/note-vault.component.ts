import {Component, Input, OnInit} from '@angular/core';
import {PopupMessageService} from "../../../services/popup-message.service";

@Component({
  selector: 'app-note-vault',
  templateUrl: './note-vault.component.html',
  styleUrls: ['./note-vault.component.scss']
})
export class NoteVaultComponent implements OnInit{
  @Input() item: any;
  decryptedData: any;

  constructor(
      private popupMessage: PopupMessageService
  ) {
  }

  ngOnInit(): void {
    this.decryptedData = this.item.decrypted_data;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.decryptedData.content);
    this.popupMessage.popupMsg('Content copied to clipboard');
  }
}
