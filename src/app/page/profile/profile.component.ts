import { Component, OnInit } from '@angular/core';
import { StorageService } from '@app/_services/storage.service';
import { UserService } from '@app/_services/api/user.service';
import { AuthService } from '@app/_services/api/auth.service';
import { UserDetailResponse } from '@interfaces/responseInterface/UserDetailResponse';
import { User, UserDetail } from '@interfaces/User';
import { NotificationService } from '@app/_services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {

  user: UserDetail | undefined;

  constructor(private storageService: StorageService,
              private userService: UserService,
              private authService: AuthService,
              private notificationService: NotificationService,
  ) {

  }

  ngOnInit(): void {
    if (!this.storageService.isLoggedIn()) {
      window.location.href = '/login';
      return;
    }

    this.user = new UserDetail({
      username: 'Loading...',
      email: 'Loading...',
      firstName: 'Loading...',
      lastName: 'Loading...',
    });

    return;

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
    this.storageService.clean();
    window.location.href = '/login';
  }
}
