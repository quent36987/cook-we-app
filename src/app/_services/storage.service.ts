import { Injectable } from '@angular/core';
import { UserResponse } from '@interfaces/responseInterface/UserResponse';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {
  }

  clean(): void {
    // if (typeof window == 'undefined'){
    //   console.log('not windows');
    //   return;
    // }

      window.sessionStorage.clear();
  }

  public saveUser(user: UserResponse): void {
    // if (typeof window == 'undefined'){
    //   console.log('not windows');
    //   return;
    // }
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));


  }

  public getUser(): UserResponse | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    // if (typeof window == 'undefined'){
    //   console.log('not windows');
    //   return false;
    // }

    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
