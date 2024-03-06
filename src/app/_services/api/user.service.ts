import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, HTTP_OPTIONS } from '@app/_services/constante';
import { parseResponse } from '@app/_services/parseResponse';
import { UserDetailResponse, UserDetailResponseSchema } from '@interfaces/responseInterface/UserDetailResponse';
import { UserResponse, UserResponseSchema } from '@interfaces/responseInterface/UserResponse';
import { RecipeResponse, RecipeResponseSchema } from '@interfaces/responseInterface/RecipeResponse';
import { z } from 'zod';
import { UpdateUserRequest } from '@interfaces/requestInterface/UpdateUserRequest';
import { MessageResponse, MessageResponseSchema } from '@interfaces/responseInterface/MessageResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getMyDetail(): Observable<UserDetailResponse> {
    return this.http.get<UserDetailResponse>(API_URL + '/auth/me',
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(UserDetailResponseSchema),
    );
  }

  getUserByUserName(username: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      API_URL + '/users/' + username,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(UserResponseSchema),
    );
  }

  getUserRecipesByUserName(username: string): Observable<RecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(
      API_URL + '/users/' + username + '/recipes',
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(z.array(RecipeResponseSchema)),
    );
  }

  getMyRecipes(): Observable<RecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(
      API_URL + '/users/recipes',
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(z.array(RecipeResponseSchema)),
    );
  }

  updateUser(updatedUser: UpdateUserRequest): Observable<UserDetailResponse> {
    return this.http.put<UserDetailResponse>(
      API_URL + '/users',
      updatedUser,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(UserDetailResponseSchema),
    );
  }

  getMyFavRecipes(): Observable<RecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(
      API_URL + '/users/favorites-recipes',
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(z.array(RecipeResponseSchema)),
    );
  }

  addRecipeFav(recipeId: number): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      API_URL + '/users/favorites-recipes/' + recipeId,
      {},
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(MessageResponseSchema),
    );
  }

  deleteRecipeFav(recipeId: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(
      API_URL + '/users/favorites-recipes/' + recipeId,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(MessageResponseSchema),
    );
  }
}
