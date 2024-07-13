import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PopupMessageService {

  constructor(private snackBar: MatSnackBar) { }

  popupMsg(message: string, action: string = '', config: any = {}): void {
    this.snackBar.open(message, action, {
      duration: config.duration || 5000,
      panelClass: config.panelClass || 'default-popup',
      horizontalPosition: config.horizontalPosition || 'center',
      verticalPosition: config.verticalPosition || 'bottom',
    });
  }
}
