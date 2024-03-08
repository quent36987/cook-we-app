import { Component } from '@angular/core';
import { AuthService } from '@app/_services/api/auth.service';
import { SignupRequest } from '@interfaces/requestInterface/SignupRequest';
import { StorageService } from '@app/_services/storage.service';
import { NotificationService } from '@app/_services/notification.service';
import { AUTH_ROUTES } from '@app/auth/auth.module';
import { ActivatedRoute, Router } from '@angular/router';


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

  constructor(
    private authService: AuthService,
    private notification: NotificationService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  onSubmit(): void {
    this.isWaiting = true;

    this.authService.register(this.form).subscribe({
      next: data => {
        this.isWaiting = false;
        this.storageService.saveUser(data);
        this.notification.openSnackBarSuccess("Compte créé avec succès", "Close");

        setTimeout(() => {
          const returnUrl = this.route.snapshot.queryParams['redirectUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        }, 400);

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

  protected readonly AUTH_ROUTES = AUTH_ROUTES;
}
