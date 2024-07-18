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

  findUser(email: any): any {
    const path = `${this.api_url}/user/find`;
    const params: any = {
      email: email,
    };
    return this.apiService.get(path, params);
  }

  loginUser(email: string): any {
    const path = `${this.api_url}/user/login`;
    const params: any ={
      email: email,
    }
    return this.apiService.get(path, params);
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

  insertVaultItem(userId: string, type: string, encryptedDate: string): any {
    const path = `${this.api_url}/vault/createItem`;
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('type', type);
    formData.append('encrypted_data', encryptedDate);
    return this.apiService.post(path, formData);
  }

  updateVaultItem(data: any): any {
    const path = `${this.api_url}/vault/updateItem`;
    return this.apiService.put(path, data);
  }
}
