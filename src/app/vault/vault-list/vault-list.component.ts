import {Component, OnInit} from '@angular/core';
import {VaultService} from "../../vault.service";
import {VaultEncryptionService} from "../../services/vault-encryption.service";
import {MasterKeyService} from "../../services/master-key.service";

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
export class VaultListComponent implements OnInit{
    categories: { icon: any; type: string; items: VaultItem[] }[] = [];
    isLoading: boolean = true;
    hasData: boolean = true;

    constructor(
        private vaultService: VaultService,
        private vaultEncryptionService: VaultEncryptionService,
        private masterKey: MasterKeyService,
    ) {
    }

    ngOnInit(): void {
        this.fetchVaultData();
    }

    fetchVaultData(){
        this.isLoading = true;
        this.vaultService.getVaultData("1003").subscribe(
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

    async getMasterKey() {
        const email = "test@test.com";
        const password = "testing_purpose";
        const kdfConfig = {iterations: 600000, keyLength: 256};
        return await this.masterKey.generateMasterKey(email, password, kdfConfig);
    }

    async organizeItems(data: any) {
        const vaultItems: VaultItem[] = Array.isArray(data) ? data : [];
        const types: VaultType[] = ['login', 'payment_method', 'note'];

        const decryptPromises = vaultItems.map(async item => {
            const masterKey: Uint8Array = await this.getMasterKey();
            const decryptedContent = await this.vaultEncryptionService.decryptVault(item.encrypted_data, masterKey);
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

    /*async organizeItems(data: any) {
        const masterKey: Uint8Array = await this.getMasterKey();
        for (let item of data){
            item.decrypted_data = JSON.parse(await this.vaultEncryptionService.decryptVault(item.encrypted_data, masterKey));
        }
        const types: VaultType[] = ['login', 'payment_method', 'note'];
        this.categories = types.map((type: VaultType) => ({
            type,
            icons: ICONS[type],
            items: data.filter(item => item.type === type && item.decrypted_data)
        })).filter(category => category.items.length > 0);
    }*/

    formatTitle(type: string): string {
        // Replace underscores with spaces and convert each word to title case
        return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }
}
