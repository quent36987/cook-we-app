import { Component, OnInit } from '@angular/core';
import { StorageService } from '@app/_services/storage.service';
import { UserService } from '@app/_services/api/user.service';
import { AuthService } from '@app/_services/api/auth.service';
import { UserDetailResponse } from '@interfaces/responseInterface/UserDetailResponse';
import { User, UserDetail } from '@interfaces/User';
import { NotificationService } from '@app/_services/notification.service';
import { AUTH_ROUTES } from '@app/auth/auth.module';
import { Location } from '@angular/common';

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
  ) {

  }

  ngOnInit(): void {
    console.log('init page profile');

    this.userService.getMyDetail().subscribe({
      next: (user: UserDetailResponse) => {
        this.user = new UserDetail(user);
      },
      error: err => {
        this.notificationService.openSnackBarError(err.error, 'Close');
      },
    });
  }

  logout(): void {
    this.authService.logout().subscribe();
    this.storageService.clearData();
    this.location.go(`/${AUTH_ROUTES.path}/${AUTH_ROUTES.login}`);
  }
}
