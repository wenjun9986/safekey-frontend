import {Component, Input, OnInit} from '@angular/core';
import {PopupMessageService} from "../../../services/popup-message.service";

@Component({
  selector: 'app-payment-vault',
  templateUrl: './payment-vault.component.html',
  styleUrls: ['./payment-vault.component.scss']
})
export class PaymentVaultComponent implements OnInit{
  @Input() item: any;
  decryptedData: any;

  constructor(
      private popupMessage: PopupMessageService
  ) {
  }

  ngOnInit(): void {
    this.decryptedData = this.item.decrypted_data;
    console.log(this.decryptedData);
  }

  getCardIcons(cardType: string): string {
    const icons: { [key: string]: string } = {
      visa: 'assets/payment-icon/visa.png',
      mastercard: 'assets/payment-icon/mastercard.png',
      amex: 'assets/payment-icon/amex.png',
    };
    return icons[cardType.toLowerCase()] || "path/to/default_icon.png";  // Added toLowerCase() for safety
  }

  copyToClipboard(content: string) {
    navigator.clipboard.writeText(content);
    this.popupMessage.popupMsg('Content copied to clipboard');
  }

}
