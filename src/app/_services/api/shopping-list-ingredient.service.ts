import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@app/environments/environment';
import { HTTP_OPTIONS } from '@app/_services/constante';
import { MessageResponse, MessageResponseSchema } from '@interfaces/responseInterface/MessageResponse';
import { IngredientShoppingListResponse, IngredientShoppingListResponseSchema } from '@interfaces/responseInterface/IngredientShoppingListResponse';
import { parseResponse } from '@app/_services/parseResponse';
import { ShoppingListIngredientRequest } from '@interfaces/requestInterface/ShoppingListIngresdientRequest';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListIngredientService {
  constructor(private http: HttpClient) {}

  public addOrUpdateIngredient(shoppingListId: number, request: ShoppingListIngredientRequest): Observable<IngredientShoppingListResponse> {
    return this.http.post<IngredientShoppingListResponse>(
      `${API_URL}/shopping-list/${shoppingListId}/ingredients`,
      request,
      HTTP_OPTIONS
    ).pipe(
      parseResponse(IngredientShoppingListResponseSchema),
    );
  }

  public checkOrUncheckIngredient(ingredientId: number, checked: boolean): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${API_URL}/shopping-list/ingredients/${ingredientId}/check?checked=${checked}`,
      null,
      HTTP_OPTIONS
    ).pipe(
      parseResponse(MessageResponseSchema),
    );
  }

  public deleteIngredient(ingredientId: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(
      `${API_URL}/shopping-list/ingredients/${ingredientId}`,
      HTTP_OPTIONS
    ).pipe(
      parseResponse(MessageResponseSchema),
    );
  }
}
