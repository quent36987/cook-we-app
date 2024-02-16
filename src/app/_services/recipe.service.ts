import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../main';
import { RecipeResponse } from '../responseClass/RecipeResponse';
import { RecipeStepResponse } from '../responseClass/RecipeStepResponse';
import { Recipe } from '../interfaces/Recipe';
import { RecipeResponseToRecipeList } from '../utils/converts';


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


}
