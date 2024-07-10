import { Component } from '@angular/core';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  navButtons = [
    {label: 'Vault', path: '/tabs/vault', iconKey: 'lock', iconKeyActive: 'lock_open'},
    {label: 'Generator', path: '/tabs/generator', iconKey: 'vpn_key', iconKeyActive: 'vpn_key' },
    {label: 'Settings', path: '/tabs/settings', iconKey: 'settings', iconKeyActive: 'settings'}
  ];

}
