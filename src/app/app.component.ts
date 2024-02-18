import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {StorageService} from './_services/storage.service';
import {EventBusService} from './_shared/event-bus.service';
import { UserDetailResponse } from '@interfaces/responseInterface/UserDetailResponse';
import { AuthService } from '@app/_services/api/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  user: UserDetailResponse | undefined;
  eventBusSub?: Subscription;



  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();


    this.authService.me().subscribe({
      next: data => {
        console.log('ici hello', data);
        this.storageService.saveUser(data);
        this.isLoggedIn = true;

        const user = this.storageService.getUser();
        this.username = user?.username;

      },
      error: err => {
        console.log('ici error', err);
        this.storageService.clean();


      }
    });

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user?.username;
    }


    this.showAdminBoard = true;
    /*this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });*/
  }

  logout()
    :
    void {
    console.log('logout')


    this.authService.logout().subscribe({
      next: res => {
        //this.storageService.clean();
        this.storageService.clean();
        console.log(res)
        console.log('logout success');


        //clear cookie



        window.location.href = '/home';
        //window.location.reload();
      },
      error: err => {
        console.log('NOOOOOOOO');
        console.log(err);
      }
    });
  }
}
