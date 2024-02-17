import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetailResponse } from '@interfaces/responseInterface/UserDetailResponse';
import { SignupRequest } from '@interfaces/requestInterface/SignupRequest';
import { UserResponse } from '@interfaces/responseInterface/UserResponse';
import { LoginRequest } from '@interfaces/requestInterface/LoginRequest';

const AUTH_API = 'http://localhost:9001/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Accept': 'application/json',
  }),

};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      loginRequest,
      httpOptions,
    );
  }

  register(signupRequest : SignupRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      AUTH_API + 'signup',
      signupRequest,
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
