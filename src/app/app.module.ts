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
import { FormManagerComponent } from './vault/form-manager/form-manager.component';
import { LoginFormComponent } from './vault/form-manager/login-form/login-form.component';
import { PaymentFormComponent } from './vault/form-manager/payment-form/payment-form.component';
import { NoteFormComponent } from './vault/form-manager/note-form/note-form.component';
import { LoginVaultComponent } from './vault/vault-list/login-vault/login-vault.component';
import { PaymentVaultComponent } from './vault/vault-list/payment-vault/payment-vault.component';
import { NoteVaultComponent } from './vault/vault-list/note-vault/note-vault.component';
import { VaultItemDialogComponent } from './vault/vault-list/vault-item-dialog/vault-item-dialog.component';

import {ReactiveFormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QrCodeModule} from "ng-qrcode";
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
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";

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
    FormManagerComponent,
    LoginFormComponent,
    PaymentFormComponent,
    NoteFormComponent,
    VaultListComponent,
    LoginVaultComponent,
    PaymentVaultComponent,
    NoteVaultComponent,
    VaultItemDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
    QrCodeModule,
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
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  providers: [PasswordPassphraseService, PasswordStrengthService, PopupMessageService, Randomizer],
  bootstrap: [AppComponent]
})
export class AppModule { }
