import { Component } from '@angular/core';
import { RecipeService } from '@app/_services/api/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '@interfaces/Recipe';
import { RecipeDetailResponse } from '@interfaces/responseInterface/RecipeDetailResponse';
import recipemodkdata from '@app/mockdata/recipe';
import { UserService } from '@app/_services/api/user.service';
import { NotificationService } from '@app/_services/notification.service';
import { StorageService } from '@app/_services/storage.service';

@Component({
  selector: 'app-page-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent {
  recipeId = this.route.snapshot.params['recipeId'];
  recipeResponse: RecipeDetailResponse | undefined = undefined;
  recipe: Recipe | undefined;
  portions = 0;
  isFavorite = false;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private userService: UserService,
              private notificationService: NotificationService,
              private storageService: StorageService,
  ) {
    if (!this.recipeId) {
      console.error('No recipe id provided');
      return;
    }

    this.recipeService
      .getRecipeById(this.recipeId)
      .subscribe((recipeResponse) => {
        this.recipe = new Recipe((recipeResponse));
        this.portions = this.recipe.portions;
      });

    if (this.storageService.isLoggedIn()) {
      this.userService.getMyFavRecipes().subscribe({
        next: data => {
          this.isFavorite = data.some((fav) => fav.id == this.recipeId);
        },
        error: err => {
          console.error('Error while fetching favorites', err);
        },
      });
    }
  }


  decreasePortions() {
    if (this.portions > 1) {
      this.portions--;
    }
  }

  increasePortions() {
    this.portions++;
  }

  toggleFavorite() {
    if (!this.recipe) {
      return;
    }

    if (!this.storageService.isLoggedIn()) {
      this.notificationService.openSnackBarError('You need to be logged in to add a recipe to your favorites', 'Close');
      return;
    }

    if (this.isFavorite) {
      this.userService.deleteRecipeFav(this.recipe.id).subscribe({
        next: data => {
          this.notificationService.openSnackBarSuccess('Recipe removed from favorites', 'Close');
        },
        error: err => {
          this.notificationService.openSnackBarError(err.error, 'Close');
        },
      });
    } else {
      this.userService.addRecipeFav(this.recipe.id).subscribe({
        next: data => {
          this.notificationService.openSnackBarSuccess('Recipe added to favorites', 'Close');
        },
        error: err => {
          this.notificationService.openSnackBarError(err.error, 'Close');
        },
      });
    }

    this.isFavorite = !this.isFavorite;
  }


}
