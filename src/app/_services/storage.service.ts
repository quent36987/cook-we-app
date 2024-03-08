import { Inject, Injectable } from '@angular/core';
import { UserResponse } from '@interfaces/responseInterface/UserResponse';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor(private router: Router,
              private actvRoute: ActivatedRoute,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  public saveData(key: string, value: string) {
    if (isPlatformBrowser(this.platformId))//<== means you are client side
    {
      localStorage.setItem(key, value);
    }
  }

  public getData(key: string) {
    if (isPlatformBrowser(this.platformId))//<== means you are client side
    {
      return localStorage.getItem(key);
    }
    return null;
  }

  public removeData(key: string) {
    if (isPlatformBrowser(this.platformId))//<== means you are client side
    {
      localStorage.removeItem(key);
    }
  }

  public clearData() {
    if (isPlatformBrowser(this.platformId))//<== means you are client side
    {
      localStorage.clear();
    }
  }

  public saveUser(user: UserResponse) {
    this.removeData('user');
    this.saveData('user', JSON.stringify(user));
    this.saveData('username', user.username ?? 'anonymous');
  }

  public getUsername(): Observable<string> {
    console.log('ici', this.getData('username'));
    return of(this.getData('username') ?? 'anonymous');
  }

  public isLoggedIn(): boolean {
    let user = this.getData('user');

    if (user) {
      return true;
    }

    return false;
  }

}
