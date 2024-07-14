import {Injectable} from '@angular/core';
import {CryptoFunctionService} from "./crypto-function.service";

interface KdfConfig {
  iterations: number;
  keyLength?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MasterKeyService {

  constructor(
    private cryptoFunctionService: CryptoFunctionService,
  ) { }

  async generateMasterKey (password: string, email: string, kdfConfig: KdfConfig){
      const salt = await this.cryptoFunctionService.hash(email);
      return await this.cryptoFunctionService.pbkdf2(password, salt, kdfConfig.iterations);
  }

  async generateMasterPasswordHash (masterKey: Uint8Array, password: string, kdfConfig: KdfConfig){
    const key = this.cryptoFunctionService.uint8ArrayToString(masterKey);
    const derivedKey =  await this.cryptoFunctionService.pbkdf2(key, password, kdfConfig.iterations);
    return this.cryptoFunctionService.arrayBufferToBase64(derivedKey);
  }
}
