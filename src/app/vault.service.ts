import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class VaultService {
  private api_url = 'http://api.safekey.local';

  constructor(
    private apiService: ApiService
  ) { }

  testing() {
    const path = `${this.api_url}/test`;
    return this.apiService.get(path);
  }

}
