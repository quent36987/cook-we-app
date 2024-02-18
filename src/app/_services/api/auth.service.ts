import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetailResponse, UserDetailResponseSchema } from '@interfaces/responseInterface/UserDetailResponse';
import { SignupRequest } from '@interfaces/requestInterface/SignupRequest';
import { UserResponse, UserResponseSchema } from '@interfaces/responseInterface/UserResponse';
import { LoginRequest } from '@interfaces/requestInterface/LoginRequest';
import { parseResponse } from '@app/_services/parseResponse';
import { API_URL, HTTP_OPTIONS } from '@app/_services/constante';
import { MessageResponse, MessageResponseSchema } from '@interfaces/responseInterface/MessageResponse';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(loginRequest: LoginRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      API_URL + '/auth/signin',
      loginRequest,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(UserResponseSchema),
    );
  }

  register(signupRequest : SignupRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      API_URL + '/auth/signup',
      signupRequest,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(UserResponseSchema),
    );
  }

  logout(): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      API_URL + '/auth/signout',
      HTTP_OPTIONS
    ).pipe(
      parseResponse(MessageResponseSchema),
    );
  }

  me(): Observable<UserDetailResponse> {
    return this.http.get<UserDetailResponse>(
      API_URL + '/auth/me',
      HTTP_OPTIONS
    ).pipe(
        parseResponse(UserDetailResponseSchema),
    );
  }
}
