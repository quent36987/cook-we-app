import { Component } from '@angular/core';
import { RecipeService } from '@app/_services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '@interfaces/Recipe';

@Component({
  selector: 'app-page-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  recipeId = this.route.snapshot.params['recipeId'];
  recipe : Recipe | undefined = undefined;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
    if (!this.recipeId) {
      console.error('No recipe id provided');
      return;
    }

    this.recipe = this.recipeService.getRecipe(this.recipeId);
  }
}
