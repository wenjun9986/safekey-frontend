import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  async canActivate() {
    const JWTToken = await this.authService.getToken();
    const email = await this.authService.getEmail();

    if (JWTToken) {
      const isValid = await this.authService.isTokenValid(JWTToken);
      if (isValid) {
        await this.router.navigate(['/tabs/vault-list']);
        return false;
      }
    }
    if (email) {
      await chrome.storage.local.remove(['JWTToken', 'masterKey', 'userId'])
      await this.router.navigate(['/login']);
      return false;
    } else {
      await chrome.storage.local.clear();
      await this.router.navigate(['/home']);
      return false;
    }
  }
}


