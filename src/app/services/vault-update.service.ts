import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VaultUpdateService {
  private updateNotifier = new Subject<void>();

  get update$(){
    return this.updateNotifier.asObservable();
  }

  notifyVaultUpdate(){
    this.updateNotifier.next();
  }
}
