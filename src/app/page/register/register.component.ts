import { Component } from '@angular/core';
import { AuthService } from '@app/_services/api/auth.service';
import { SignupRequest } from '@interfaces/requestInterface/SignupRequest';
import { StorageService } from '@app/_services/storage.service';
import { NotificationService } from '@app/_services/notification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: SignupRequest = {
    username: "",
    email: "",
    password: ""
  };

  isWaiting = false;
  showPassword: boolean = false;

  constructor(private authService: AuthService, private notification: NotificationService, private storageService: StorageService) { }

  onSubmit(): void {
    this.isWaiting = true;

    this.authService.register(this.form).subscribe({
      next: data => {
        this.isWaiting = false;
        this.storageService.saveUser(data);
        this.notification.openSnackBarSuccess("Compte créé avec succès", "Close");

        setTimeout(() => {
          window.location.href = "/home";
        }, 1000);

        this.form = {
          username: "",
          email: "",
          password: ""
        };
      },
      error: err => {
        this.isWaiting = false;
        this.notification.openSnackBarError(err.error, "Close");
      }
    });
  }
}
