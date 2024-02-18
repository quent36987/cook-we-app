import { Component } from '@angular/core';
import { RecipeService } from '@app/_services/api/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '@interfaces/Recipe';
import { RecipeDetailResponse } from '@interfaces/responseInterface/RecipeDetailResponse';

@Component({
  selector: 'app-page-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  recipeId = this.route.snapshot.params['recipeId'];
  recipeResponse : RecipeDetailResponse | undefined = undefined;
  recipe : Recipe | undefined;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
    if (!this.recipeId) {
      console.error('No recipe id provided');
      return;
    }

    this.recipeService
      .getRecipeById(this.recipeId)
      .subscribe((recipeResponse) => {
        this.recipe = new Recipe((recipeResponse))
      });
  }
}
