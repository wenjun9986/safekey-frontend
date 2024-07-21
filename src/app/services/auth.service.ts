import { Injectable } from '@angular/core';
import {VaultService} from "../vault.service";
import {map, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private vaultService: VaultService,
  ) { }

  async getToken(): Promise<string|null> {
    return new Promise(resolve => {
      chrome.storage.local.get(['JWTToken'], (result) => {
        if (result['JWTToken']) {
          resolve(result['JWTToken']);
        } else {
          resolve(null);
        }
      });
    });
  }

  async getEmail(): Promise<string|null> {
    return new Promise(resolve => {
      chrome.storage.local.get(['email'], (result) => {
        if (result['email']) {
          resolve(result['email']);
        } else {
          resolve(null);
        }
      });
    });
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      return now > payload.exp;
    } catch (error) {
      return true;
    }
  }
  isTokenValid(token: string): Promise<boolean> {
    if (this.isTokenExpired(token)) {
      return Promise.resolve(false);
    }
    return this.vaultService.validateJWTToken(token).pipe(
        map((response: any) => true),
        catchError((error: any) => {
          return of (false);
        })
    ).toPromise();
  }
}
