import {Component, OnDestroy, OnInit} from '@angular/core';
import {VaultService} from "../../vault.service";
import {VaultEncryptionService} from "../../services/vault-encryption.service";
import {VaultUpdateService} from "../../services/vault-update.service";
import {Subscription} from "rxjs";
import {CryptoFunctionService} from "../../services/crypto-function.service";

type VaultType = 'login' | 'payment_method' | 'note';

interface VaultItem {
    item_id: string;
    user_id: string;
    type: VaultType;
    encrypted_data: string;
    decrypted_data?: any;
    created_at: string;
    updated_at: string;
}

interface Category {
    type: VaultType;
    icon: string;
    items: VaultItem[];
}

const ICONS: { [key in VaultType]: string } = {
    login: 'language',
    payment_method: 'credit_card',
    note: 'description'
};

@Component({
  selector: 'app-vault-list',
  templateUrl: './vault-list.component.html',
  styleUrls: ['./vault-list.component.scss']
})
export class VaultListComponent implements OnInit, OnDestroy{
    categories: { icon: any; type: string; items: VaultItem[] }[] = [];
    isLoading: boolean = true;
    hasData: boolean = true;
    masterKey: Uint8Array = new Uint8Array();
    userId: string = '';
    private updateSubscription: Subscription = new Subscription();


    constructor(
        private vaultService: VaultService,
        private cryptoService: CryptoFunctionService,
        private vaultEncryptionService: VaultEncryptionService,
        private vaultUpdateService: VaultUpdateService
    ) {
    }

    async ngOnInit() {
      await this.initializeData();
      this.fetchVaultData();
      this.updateSubscription = this.vaultUpdateService.update$.subscribe(() => {
        this.fetchVaultData();
      });
    }

    ngOnDestroy(): void {
      this.updateSubscription.unsubscribe();
    }

    async initializeData() {
      const {masterKey, userId} = await chrome.storage.local.get(['masterKey', 'userId']);
      this.masterKey = new Uint8Array(this.cryptoService.base64ToArrayBuffer(masterKey));
      this.userId = userId;
    }

    fetchVaultData(){
      this.isLoading = true;
      this.vaultService.getVaultData(this.userId).subscribe(
        (response: any) => {
          if (response && Array.isArray(response.data)) {
            this.organizeItems(response.data);
          } else {
            this.isLoading = false;
            this.hasData = false;
          }
        },
        (error: any) => {
          this.hasData = false;
          this.isLoading = false;
        }
      )
    }

    async organizeItems(data: any) {
        const vaultItems: VaultItem[] = Array.isArray(data) ? data : [];
        const types: VaultType[] = ['login', 'payment_method', 'note'];
        const decryptPromises = vaultItems.map(async item => {
            const decryptedContent = await this.vaultEncryptionService.decryptVault(item.encrypted_data, this.masterKey);
            return {...item, decrypted_data: JSON.parse(decryptedContent)};
        });

        const decryptedItems = await Promise.all(decryptPromises);

        this.categories = types.map((type: VaultType) => ({
            type,
            icon: ICONS[type],
            items: decryptedItems.filter(item => item.type === type)
        })).filter(category => category.items.length > 0);
        this.isLoading = false;
    }

    formatTitle(type: string): string {
        return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }
}
