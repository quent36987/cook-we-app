import { Component, OnInit } from '@angular/core';
import { StorageService } from './_services/storage.service';
import { UserDetailResponse } from '@interfaces/responseInterface/UserDetailResponse';
import { AuthService } from '@app/_services/api/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgForOf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '@app/_shared/component/header/header.component';
import { SpinnerComponent } from '@app/_shared/component/spinner/spinner.component';


@Component({
  imports: [
    RouterOutlet,
    NgForOf,
    HttpClientModule,
    RouterLink,
    HeaderComponent,
    SpinnerComponent,
  ],
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {

    this.authService.me().subscribe({
      next: data => {
        console.log('ici hello', data);
        this.storageService.saveUser(data);
      },
      error: err => {
        console.log('ici error', err);
        this.storageService.clearData();
      },
    });
  }

  // logout(): void {
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

}

