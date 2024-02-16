import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserDetailResponse } from '../responseClass/UserDetailResponse';


const AUTH_API = 'http://localhost:9001/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions,
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions,
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', httpOptions);
  }

  me(): Observable<UserDetailResponse> {
    return this.http.get<UserDetailResponse>(AUTH_API + 'me', httpOptions);
  }
}
