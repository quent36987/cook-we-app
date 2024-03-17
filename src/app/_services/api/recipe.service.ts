import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { z } from 'zod';
import { RecipeResponse, RecipeResponseSchema } from '@interfaces/responseInterface/RecipeResponse';
import { RecipeStepResponse } from '@interfaces/responseInterface/RecipeStepResponse';
import { API_URL, HTTP_OPTIONS } from '@app/_services/constante';
import { parseResponse } from '@app/_services/parseResponse';
import { RecipeRequest } from '@interfaces/requestInterface/RecipeRequest';
import { MessageResponse, MessageResponseSchema } from '@interfaces/responseInterface/MessageResponse';
import { RecipeDetailResponse, RecipeDetailResponseSchema } from '@interfaces/responseInterface/RecipeDetailResponse';
import { PageResponse, PageResponseSchema } from '@interfaces/responseInterface/PageResponse';
import { EType } from '@interfaces/EType';
import { ESeason } from '@interfaces/ESeason';

export interface GetRecipeParams {
  name? : string;
  type? : EType[];
  season? : ESeason[];
  sort? : string;
  size? : number;
  page? : number;
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {
  }

  public getAllRecipes(
    params: GetRecipeParams = {},
  ): Observable<PageResponse<RecipeResponse>> {
    return this.http.get<PageResponse<RecipeResponse>>(
      API_URL + '/recipes',
      {
        ...HTTP_OPTIONS,
        params: {
          ...params,
          type: params.type?.join(',') ?? '',
          season: params.season?.join(',') ?? '',
        },
      },
    ).pipe(
      parseResponse(
        PageResponseSchema(RecipeResponseSchema),
      ),
    );
  }

  public getRecipeById(id: number): Observable<RecipeDetailResponse> {
    return this.http.get<RecipeDetailResponse>(
      API_URL + '/recipes/' + id,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(RecipeDetailResponseSchema),
    );
  }

  public getRecipeSteps(id: number): Observable<RecipeStepResponse[]> {
    return this.http.get<RecipeStepResponse[]>(
      API_URL + '/recipes/' + id + '/steps',
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(z.array(RecipeResponseSchema)),
    );
  }

  public getRecipeByIngredient(ingredient: string[]): Observable<RecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(
      API_URL + '/recipes/ingredients/search?ingredients=' + ingredient.join(','),
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(z.array(RecipeResponseSchema)),
    );
  }

  public postRecipe(recipe: RecipeRequest): Observable<RecipeResponse> {
    return this.http.post<RecipeResponse>(
      API_URL + '/recipes',
      recipe,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(RecipeResponseSchema),
    );
  }

  public putRecipe(recipeId: number, recipe: RecipeRequest): Observable<RecipeResponse> {
    return this.http.put<RecipeResponse>(
      API_URL + '/recipes/' + recipeId,
      recipe,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(RecipeResponseSchema),
    );
  }

  public deleteRecipe(recipeId: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(
      API_URL + '/recipes/' + recipeId,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(MessageResponseSchema),
    );
  }
}
