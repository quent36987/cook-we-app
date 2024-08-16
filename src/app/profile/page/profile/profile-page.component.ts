import { Component, OnInit } from '@angular/core';
import { StorageService } from '@app/_services/storage.service';
import { UserService } from '@app/_services/api/user.service';
import { AuthService } from '@app/_services/api/auth.service';
import { UserDetailResponse } from '@interfaces/responseInterface/UserDetailResponse';
import { User, UserDetail } from '@interfaces/User';
import { NotificationService } from '@app/_services/notification.service';
import { AUTH_ROUTES } from '@app/auth/auth.module';
import { Location } from '@angular/common';
import { PopupType } from '@app/_shared/component/popup/popup.model';
import { PopupService } from '@app/_services/popup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {

  user: UserDetail | undefined;

  constructor(private storageService: StorageService,
              private userService: UserService,
              private authService: AuthService,
              private notificationService: NotificationService,
              private location: Location,
              private popupService: PopupService,
  ) {

  }

  ngOnInit(): void {
    console.log('init page profile');

    this.userService.getMyDetail().subscribe({
      next: (user: UserDetailResponse) => {
        this.user = new UserDetail(user);
      },
      error: err => {
        this.notificationService.openSnackBarError(err.error.message, 'Close');
      },
    });
  }

  logout(): void {
    this.authService.logout().subscribe();
    this.storageService.clearData();
    this.location.go(`/${AUTH_ROUTES.path}/${AUTH_ROUTES.login}`);
  }

  changePassword(): void {
    this.popupService.showPopup({
      type: PopupType.Input,
      title: 'Changer votre mot de passe',
      description: 'Entrer votre nouveau mot de passe',
      confirmButton: 'Changer',
      callback: (password) => {
        if (!password) {
          this.notificationService.openSnackBarError('Le mot de passe ne peut pas être vide', 'Close');
          return;
        }
        this.authService.changePassword(password).subscribe({
          next: res => {
            this.notificationService.openSnackBarSuccess(res.message, 'Close');
          },
          error: err => {
            this.notificationService.openSnackBarError(err.error.message, 'Close');
          },
        });
      },
    });
  }
}
