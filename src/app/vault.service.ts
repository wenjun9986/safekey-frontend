import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  private api_url = 'http://api.safekey.local';

  constructor(
    private apiService: ApiService,
  ) { }

  validateJWTToken(token: string): any {
    const path = `${this.api_url}/auth/validateToken`;
    const formData = new FormData();
    formData.append('token', token);
    return this.apiService.post(path, formData);
  }

  generate2FASecret(email: string): any {
    const path = `${this.api_url}/auth/generate2FASecret`;
    const params: any = {
      email: email,
    };
    return this.apiService.get(path, params);
  }

  enable2FA(userId: string, otp: string, secret: string): any {
    const path = `${this.api_url}/auth/enable2FA`;
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('otp', otp);
    formData.append('secret', secret);
    return this.apiService.post(path, formData);
  }



  findUser(email: any): any {
    const path = `${this.api_url}/user/find`;
    const params: any = {
      email: email,
    };
    return this.apiService.get(path, params);
  }

  loginUser(email: string, master_password_hash: string): any {
    const path = `${this.api_url}/user/login`;
    const formData = new FormData();
    formData.append('email', email);
    formData.append('master_password_hash', master_password_hash);
    return this.apiService.post(path, formData);
  }

  registerUser(email: string, masterPasswordHash: string): any {
    const path = `${this.api_url}/user/register`;
    const formData = new FormData();
    formData.append('email', email);
    formData.append('master_password_hash', masterPasswordHash);
    return this.apiService.post(path, formData);
  }

  getVaultData(userId: string): any {
    const path = `${this.api_url}/vault/list`;
    const params: any = {
        user_id: userId,
    };
    return this.apiService.get(path, params);
  }

  insertVaultItem(userId: string, type: string, encryptedData: string): any {
    const path = `${this.api_url}/vault/createItem`;
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('type', type);
    formData.append('encrypted_data', encryptedData);
    return this.apiService.post(path, formData);
  }

  updateVaultItem(itemId: string, userId: string, encryptedData: string): any {
    const path = `${this.api_url}/vault/updateItem`;
    const formData = new FormData();
    formData.append('item_id', itemId);
    formData.append('user_id', userId);
    formData.append('encrypted_data', encryptedData);
    return this.apiService.post(path, formData);
  }
}
