import {Component} from '@angular/core';
import { AuthService } from '@app/_services/api/auth.service';
import { StorageService } from '@app/_services/storage.service';
import { NotificationService } from '@app/_services/notification.service';
import { LoginRequest } from '@interfaces/requestInterface/LoginRequest';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: LoginRequest = {
    username: "",
    password: ""
  };

  isWaiting = false;
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private notification: NotificationService,
    private _location: Location,
  ) {
  }

  onSubmit(): void {

    this.isWaiting = true;

    this.authService.login(this.form).subscribe({
        next: data => {
          this.storageService.saveUser(data);
          this.isWaiting = false;
          this.notification.openSnackBarSuccess("Connection réussi", "Close");

          setTimeout(() => {
            this._location.back();
          }, 1000);
        },
        error: err => {
          this.isWaiting = false;
          this.notification.openSnackBarError(err.error, "Close");
        },
      },
    );
  }
}
