import { Component } from '@angular/core';
import { Recipe } from '@interfaces/Recipe';
import { UserService } from '@app/_services/api/user.service';
import { StorageService } from '@app/_services/storage.service';
import recipemodkdata from '@app/mockdata/recipe';
import { NotificationService } from '@app/_services/notification.service';
import { RecipeResponse } from '@interfaces/responseInterface/RecipeResponse';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent {
  recipes: Recipe[] = [];

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private notificationService: NotificationService,
  ) {
    if (this.storageService.isLoggedIn()) {
      this.userService.getMyFavRecipes().subscribe({
        next: (data) => {
          this.recipes = data.map((recipeResponse: RecipeResponse) => new Recipe(recipeResponse));
        },
        error: (error) => {
          this.notificationService.openSnackBarError('Erreur lors de la récupération de vos favoris', 'Close');
        },
      });
    } else {
      this.notificationService.openSnackBarError('Vous devez être connecté pour accéder à vos favoris', 'Close');
    }
  }

}
