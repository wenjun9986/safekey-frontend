import { Component } from '@angular/core';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  currentHeader = 'Default Title';
  //TODO: change based the behaviour later

  navButtons = [
    {label: 'Vault', path: '/tabs/vault', header: 'Vault', iconKey: 'lock', iconKeyActive: 'lock_open'},
    {label: 'Generator', path: '/tabs/generator', header: 'Password Generator', iconKey: 'vpn_key', iconKeyActive: 'vpn_key' },
    {label: 'Settings', path: '/tabs/settings', header: 'Settings', iconKey: 'settings', iconKeyActive: 'settings'}
  ];

  updateHeader(header: string){
    this.currentHeader = header;
  }
}
