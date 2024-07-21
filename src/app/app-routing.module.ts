import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HomeComponent } from './auth/home/home.component';
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { TabsComponent } from "./vault/tabs/tabs.component";
import { GeneratorComponent } from "./vault/generator/generator.component";
import { SettingsComponent } from './vault/settings/settings.component';
import { VaultListComponent } from "./vault/vault-list/vault-list.component";
import { FormManagerComponent } from "./vault/form-manager/form-manager.component";
import { RedirectGuard } from "./guards/redirect.guard";
import { AuthGuard } from "./guards/auth.guard";


const routes: Routes = [
  {
    path: '',
    children: [],
    canActivate: [RedirectGuard],
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
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'vault-list',
        pathMatch: 'full',
      },
      {
        path: 'form-manager',
        component:FormManagerComponent,
      },
      {
        path: 'vault-list',
        component: VaultListComponent,
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
