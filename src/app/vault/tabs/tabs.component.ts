import { Component } from '@angular/core';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  currentHeader = 'Vault';

  navButtons = [
    {label: 'Add Item', path: '/tabs/form-manager', header: 'Add Items', iconKey: 'add_circle', iconKeyActive: 'add_circle'},
    {label: 'Vault', path: '/tabs/vault-list', header: 'Vault', iconKey: 'lock', iconKeyActive: 'lock_open'},
    {label: 'Generator', path: '/tabs/generator', header: 'Password Generator', iconKey: 'vpn_key', iconKeyActive: 'vpn_key' },
    {label: 'Settings', path: '/tabs/settings', header: 'Settings', iconKey: 'settings', iconKeyActive: 'settings'}
  ];

  updateHeader(header: string){
    this.currentHeader = header;
  }
}
