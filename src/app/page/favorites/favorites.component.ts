import { Component } from '@angular/core';
import { Recipe } from '@interfaces/Recipe';
import { UserService } from '@app/_services/api/user.service';
import { StorageService } from '@app/_services/storage.service';
import recipemodkdata from '@app/mockdata/recipe';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  recipes: Recipe[] = [];

  constructor(private storageService: StorageService, private userService: UserService) {
    this.recipes = [
      new Recipe(recipemodkdata),
      new Recipe(recipemodkdata),
      new Recipe(recipemodkdata),
      new Recipe(recipemodkdata),
      new Recipe(recipemodkdata),
    ];
  }

}
