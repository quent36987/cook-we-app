import { Component } from '@angular/core';
import { Recipe } from '@interfaces/Recipe';
import { RecipeService } from '@app/_services/api/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {
    //this.recipes = this.recipeService.getRecipes();
  }
}
