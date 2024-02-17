import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBarError(message: string, action: string) {
    this._snackBar.open(message, action, {
      panelClass: ['mat-toolbar', 'mat-warn'],
      duration: 4000,
    });
  }

  openSnackBarSuccess(message: string, action: string) {
    this._snackBar.open(message, action, {
      panelClass: ['mat-toolbar', 'mat-primary'],
      duration: 4000,
    });
  }
}
