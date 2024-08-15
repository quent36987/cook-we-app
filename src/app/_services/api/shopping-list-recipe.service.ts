import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@app/environments/environment';
import { HTTP_OPTIONS } from '@app/_services/constante';
import { MessageResponse, MessageResponseSchema } from '@interfaces/responseInterface/MessageResponse';
import { RecipeShoppingListResponse, RecipeShoppingListResponseSchema } from '@interfaces/responseInterface/RecipeShoppingListResponse';
import { ShoppingListRecipeRequest } from '@interfaces/requestInterface/ShoppingListRecipeRequest';
import { parseResponse } from '@app/_services/parseResponse';
import { z } from 'zod';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListRecipeService {
  constructor(private http: HttpClient) {}

  public addOrUpdateRecipe(shoppingListId: number, request: ShoppingListRecipeRequest): Observable<RecipeShoppingListResponse> {
    return this.http.post<RecipeShoppingListResponse>(
      `${API_URL}/shopping-list/${shoppingListId}/recipes`,
      request,
      HTTP_OPTIONS
    ).pipe(
      parseResponse(RecipeShoppingListResponseSchema),
    );
  }

  public removeRecipe(shoppingListId: number, recipeId: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(
      `${API_URL}/shopping-list/${shoppingListId}/recipes/${recipeId}`,
      HTTP_OPTIONS
    ).pipe(
      parseResponse(MessageResponseSchema),
    );
  }
}
