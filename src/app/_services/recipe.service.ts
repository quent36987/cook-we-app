import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../main';

import { Recipe } from '@interfaces/Recipe';
import { RecipeResponseToRecipe, RecipeResponseToRecipeList } from '@utils/converts';
import { RecipeResponse } from '@interfaces/responseInterface/RecipeResponse';
import { RecipeStepResponse } from '@interfaces/responseInterface/RecipeStepResponse';


@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {
  }

  private getAllRecipes(): Observable<RecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(API_URL + '/recipes', { responseType: 'json' });
  }

  private getRecipeById(id: number): Observable<RecipeResponse> {
    return this.http.get<RecipeResponse>(API_URL + '/recipes/' + id, { responseType: 'json' });
  }

  private getRecipeSteps(id: number): Observable<RecipeStepResponse> {
    return this.http.get<RecipeStepResponse>(API_URL + '/recipes/' + id + '/steps', { responseType: 'json' });
  }

  public getRecipes(): Recipe[] {
    let recipes: Recipe[] = [];

    this.getAllRecipes().subscribe((recipeResponses) => {
      recipes = RecipeResponseToRecipeList(recipeResponses);
    });

    return recipes;
  }

  public getRecipe(id: number): Recipe | undefined {
    let recipe: Recipe | undefined = undefined;

    this.getRecipeById(id).subscribe((recipeResponse) => {
      recipe = RecipeResponseToRecipe(recipeResponse);
    });

    return recipe;
  }


}
