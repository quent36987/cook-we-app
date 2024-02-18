import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IngredientResponse, IngredientResponseSchema } from '@interfaces/responseInterface/IngredientResponse';
import { Observable } from 'rxjs';
import { API_URL, HTTP_OPTIONS } from '@app/_services/constante';
import { CreateIngredientRequest } from '@interfaces/requestInterface/CreateIngredientRequest';
import { MessageResponse, MessageResponseSchema } from '@interfaces/responseInterface/MessageResponse';
import { parseResponse } from '@app/_services/parseResponse';
import { z } from 'zod';


@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  constructor(private http: HttpClient) {
  }

  public getIngredientsByRecipeId(id: number) : Observable<IngredientResponse[]> {
    return this.http.get<IngredientResponse[]>(
      API_URL + '/ingredients/recipes/' + id ,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(z.array(IngredientResponseSchema)),
    );
  }

  public putIngredient(ingredient: CreateIngredientRequest, recipeId : number): Observable<IngredientResponse> {
    return this.http.post<IngredientResponse>(
      API_URL + '/ingredients/recipes/' + recipeId,
      ingredient,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(IngredientResponseSchema),
    );
  }

  public deleteIngredient(ingredientName : string ,recipeId: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(
      API_URL + '/ingredients/recipes/' + recipeId + '/' + ingredientName,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(MessageResponseSchema),
    );
  }

}
