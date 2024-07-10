import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HomeComponent } from './auth/home/home.component';
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { TabsComponent } from "./vault/tabs/tabs.component";
import { VaultComponent } from "./vault/vault/vault.component";
import { GeneratorComponent } from "./vault/generator/generator.component";
import { SettingsComponent } from './vault/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full', // Ensure that this route is matched when the entire URL is empty
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: '',
        redirectTo: 'vault',
        pathMatch: 'full',
      },
      {
        path: 'vault',
        component: VaultComponent,
      },
      {
        path: 'generator',
        component: GeneratorComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
