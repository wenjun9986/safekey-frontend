import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './auth/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { TabsComponent } from './vault/tabs/tabs.component';
import { VaultListComponent } from './vault/vault-list/vault-list.component';
import { GeneratorComponent } from './vault/generator/generator.component';
import { SettingsComponent } from './vault/settings/settings.component';
import { VaultManagerComponent } from './vault/vault-manager/vault-manager.component';
import { LoginFormComponent } from './vault/vault-manager/login-form/login-form.component';
import { PaymentFormComponent } from './vault/vault-manager/payment-form/payment-form.component';
import { NoteFormComponent } from './vault/vault-manager/note-form/note-form.component';

import {ReactiveFormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatRadioModule} from "@angular/material/radio";
import {MatCardModule} from "@angular/material/card";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSliderModule} from "@angular/material/slider";
import {MatListModule} from "@angular/material/list";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTooltipModule} from "@angular/material/tooltip";

import {PasswordPassphraseService} from "./services/password-passphrase.service";
import {PasswordStrengthService} from "./services/password-strength.service";
import {PopupMessageService} from "./services/popup-message.service";
import {Randomizer} from "./abstractions/randomizer";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    TabsComponent,
    GeneratorComponent,
    SettingsComponent,
    VaultManagerComponent,
    VaultListComponent,
    LoginFormComponent,
    PaymentFormComponent,
    NoteFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatRadioModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatListModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTooltipModule,
  ],
  providers: [PasswordPassphraseService, PasswordStrengthService, PopupMessageService, Randomizer],
  bootstrap: [AppComponent]
})
export class AppModule { }
