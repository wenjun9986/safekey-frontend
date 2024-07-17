import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoFunctionService {

  constructor() { }

  async hash(value: string, algorithm: string = 'SHA-256'): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const hash = await crypto.subtle.digest(algorithm, data);
    return this.arrayBufferToHex(hash);
  }

  async pbkdf2(password: string, salt: string, iterations: number = 600000, keyLength: number = 256): Promise<Uint8Array> {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    const saltBuffer = encoder.encode(salt);
    const keyMaterial = await crypto.subtle.importKey('raw', passwordBuffer, { name: 'PBKDF2' }, false, ['deriveBits', 'deriveKey']);
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: saltBuffer,
        iterations: iterations,
        hash: 'SHA-256'
      },
      keyMaterial,
      keyLength
    );
    return new Uint8Array(derivedBits);
  }

  async aesEncrypt(data: Uint8Array, key: Uint8Array, iv: Uint8Array): Promise<Uint8Array> {
    const keyObj = await crypto.subtle.importKey('raw', key, { name: 'AES-CBC' }, false, ['encrypt']);
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, keyObj, data);
    return new Uint8Array(encrypted);
  }

  async generateHMAC(data: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
    const hmacKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: { name: 'SHA-256' } }, false, ['sign']);
    return new Uint8Array(await crypto.subtle.sign('HMAC', hmacKey, data));
  }

  async verifyHMAC(data: Uint8Array, key: Uint8Array, expectedHMAC: Uint8Array): Promise<boolean> {
    const hmacKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: { name: 'SHA-256' } }, false, ['verify']);
    return crypto.subtle.verify('HMAC', hmacKey, expectedHMAC, data);
  }

  async aesDecrypt(data: Uint8Array, key: Uint8Array, iv: Uint8Array): Promise<Uint8Array> {
    const keyObj = await crypto.subtle.importKey('raw', key, { name: 'AES-CBC' }, false, ['decrypt']);
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, keyObj, data);
    return new Uint8Array(decrypted);
  }

  public arrayBufferToHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  public uint8ArrayToString(data: Uint8Array): string {
    const decoder = new TextDecoder(); // Default is utf-8
    return decoder.decode(data);
  }

  public arrayBufferToBase64(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

  public base64ToArrayBuffer(base64: string): ArrayBuffer {
    return Uint8Array.from(atob(base64), c => c.charCodeAt(0)).buffer;
  }
}
