import { Inject, Injectable, InjectionToken, makeStateKey, TransferState } from '@angular/core';
import { UserResponse } from '@interfaces/responseInterface/UserResponse';

const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private transferState: TransferState) {
  }

  getItem(key: string): any {
    const stateKey = makeStateKey(key);
    return this.transferState.get(stateKey, null);
  }

  // Méthode pour stocker une paire clé-valeur dans le TransferState
  setItem(key: string, value: any): void {
    const stateKey = makeStateKey(key);
    this.transferState.set(stateKey, value);
  }

  // Méthode pour supprimer une clé du TransferState
  removeItem(key: string): void {
    const stateKey = makeStateKey(key);
    this.transferState.remove(stateKey);
  }

  clean(): void {
    this.removeItem(USER_KEY);
  }

  public saveUser(user: UserResponse): void {
    this.removeItem(USER_KEY);
    this.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): UserResponse | null {
    const user = this.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    let user = this.getItem(USER_KEY);

    if (user) {
      return true;
    }

    return false;
  }
}
