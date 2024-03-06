import { Component } from '@angular/core';
import { StorageService } from './_services/storage.service';
import { UserDetailResponse } from '@interfaces/responseInterface/UserDetailResponse';
import { AuthService } from '@app/_services/api/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgForOf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '@app/_shared/component/header/header.component';


@Component({
  imports: [
    RouterOutlet,
    NgForOf,
    HttpClientModule,
    RouterLink,
    HeaderComponent,
  ],
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent { //implements OnInit {
  // private roles: string[] = [];
  // isLoggedIn = false;
  // showAdminBoard = false;
  // username?: string;
  // user: UserDetailResponse | undefined;
  //
  //
  // constructor(
  //   private storageService: StorageService,
  //   private authService: AuthService,
  // ) {
  // }
  //
  // ngOnInit(): void {
  //   this.isLoggedIn = this.storageService.isLoggedIn();
  //
  //
  //   this.authService.me().subscribe({
  //     next: data => {
  //       console.log('ici hello', data);
  //       this.storageService.saveUser(data);
  //       this.isLoggedIn = true;
  //
  //       const user = this.storageService.getUser();
  //
  //     },
  //     error: err => {
  //       console.log('ici error', err);
  //       this.storageService.clean();
  //
  //
  //     },
  //   });
  //
  //   if (this.isLoggedIn) {
  //     const user = this.storageService.getUser();
  //     // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
  //     // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
  //
  //   }
  //
  //
  //   this.showAdminBoard = true;
  //   /*this.eventBusSub = this.eventBusService.on('logout', () => {
  //     this.logout();
  //   });*/
  // }
  //
  // logout()
  //   :
  //   void {
  //   console.log('logout');
  //
  //
  //   this.authService.logout().subscribe({
  //     next: res => {
  //       //this.storageService.clean();
  //       this.storageService.clean();
  //       console.log(res);
  //       console.log('logout success');
  //
  //
  //       //clear cookie
  //
  //
  //       window.location.href = '/home';
  //       //window.location.reload();
  //     },
  //     error: err => {
  //       console.log('NOOOOOOOO');
  //       console.log(err);
  //     },
  //   });
  // }
}

