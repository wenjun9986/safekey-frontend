import { Injectable } from '@angular/core';
import {CryptoFunctionService} from "./crypto-function.service";

@Injectable({
  providedIn: 'root'
})
export class VaultEncryptionService {

  constructor(
    private cryptoFunctionService: CryptoFunctionService,
  ) { }

  async encryptVault (data: string, key: Uint8Array){
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encoder = new TextEncoder();
    const dataBytes = encoder.encode(data);
    const encryptedData = await this.cryptoFunctionService.aesEncrypt(dataBytes, key, iv);
    const hmac = await this.cryptoFunctionService.generateHMAC(encryptedData, key);
    const ivBase64 = this.cryptoFunctionService.arrayBufferToBase64(iv.buffer);
    const encryptedDataBase64 = this.cryptoFunctionService.arrayBufferToBase64(encryptedData.buffer);
    const hmacBase64 = this.cryptoFunctionService.arrayBufferToBase64(hmac.buffer);

    return `1|${ivBase64}|${encryptedDataBase64}|${hmacBase64}`;
  }

  async decryptVault (data: string, key: Uint8Array){
    const parts = data.split('|');
    if(parts.length !== 4) {
      throw new Error('Invalid Encrypted Data Format');
    }
    const iv = new Uint8Array(this.cryptoFunctionService.base64ToArrayBuffer(parts[1]));
    const encryptedData = new Uint8Array(this.cryptoFunctionService.base64ToArrayBuffer(parts[2]));
    const hmac = new Uint8Array(this.cryptoFunctionService.base64ToArrayBuffer(parts[3]));
    const validHMAC = await this.cryptoFunctionService.verifyHMAC(encryptedData, key, hmac);

    if(!validHMAC){
      throw new Error('Data Integrity Check Failed');
    }
    const decryptedData = await this.cryptoFunctionService.aesDecrypt(new Uint8Array(encryptedData), key, new Uint8Array(iv));
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  }
}
