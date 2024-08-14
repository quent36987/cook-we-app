import { Component } from '@angular/core';
import { AuthService } from '@app/_services/api/auth.service';
import { StorageService } from '@app/_services/storage.service';
import { NotificationService } from '@app/_services/notification.service';
import { LoginRequest } from '@interfaces/requestInterface/LoginRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupService } from '@app/_services/popup.service';
import { PopupType } from '@app/_shared/component/popup/popup.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: LoginRequest = {
    username: '',
    password: '',
  };

  isWaiting = false;
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private popupService: PopupService,
  ) {
  }

  onSubmit(): void {

    this.isWaiting = true;

    this.authService.login(this.form).subscribe({
        next: data => {
          this.storageService.saveUser(data);
          this.isWaiting = false;
          this.notification.openSnackBarSuccess('Connection réussi', 'Close');

          setTimeout(() => {
            const returnUrl = this.route.snapshot.queryParams['redirectUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
          }, 400);
        },
        error: err => {
          this.isWaiting = false;
          this.notification.openSnackBarError(err.error, 'Close');
        },
      },
    );
  }

  goToRegister() {
    const returnUrl = this.route.snapshot.queryParams['redirectUrl'];

    console.log('retuen url', returnUrl);
    if (returnUrl) {
      this.router.navigateByUrl(this.router.createUrlTree(['/auth/register'], {
        queryParams: {
          redirectUrl: returnUrl,
        },
      }));
      return;
    }

    this.router.navigateByUrl(this.router.createUrlTree(['/auth/register']));
  }

  onPasswordForgotten() {
    this.popupService.showPopup({
      type: PopupType.Input,
      title: 'Mot de passe oublié',
      description: 'Veuillez entrer votre adresse email, un email vous sera envoyé (verifiez vos spams)',
      confirmButton: 'Envoyer',
      callback: (email) => {
        if (!email) {
          this.notification.openSnackBarError('Veuillez entrer une adresse email', 'Close');
          return;
        }

        this.authService.newPassword(email).subscribe({
          next: () => {
            this.notification.openSnackBarSuccess('Un email vous a été envoyé', 'Close');
          },
          error: () => {
            this.notification.openSnackBarError("Erreur lors de l'envoi de l'email", 'Close');
          },
        });
      }
    });
  }

}
