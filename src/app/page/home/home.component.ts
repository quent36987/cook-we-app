import { Component } from '@angular/core';
import { Recipe } from '../../interfaces/Recipe';
import { RecipeService } from '../../_services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {
    this.recipes = this.recipeService.getRecipes();
  }
}
