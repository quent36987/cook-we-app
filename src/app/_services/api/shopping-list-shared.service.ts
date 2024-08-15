import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@app/environments/environment';
import { HTTP_OPTIONS } from '@app/_services/constante';
import { MessageResponse, MessageResponseSchema } from '@interfaces/responseInterface/MessageResponse';
import { parseResponse } from '@app/_services/parseResponse';
import { z } from 'zod';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListSharedService {
  constructor(private http: HttpClient) {}

  public addUserToShoppingList(shoppingListId: number, usernameToAdd: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${API_URL}/shopping-list/${shoppingListId}/users/${usernameToAdd}`,
      null,
      HTTP_OPTIONS
    ).pipe(
      parseResponse(MessageResponseSchema),
    );
  }

  public removeUserFromShoppingList(shoppingListId: number, usernameToRemove: string): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(
      `${API_URL}/shopping-list/${shoppingListId}/users/${usernameToRemove}`,
      HTTP_OPTIONS
    ).pipe(
      parseResponse(MessageResponseSchema),
    );
  }
}
