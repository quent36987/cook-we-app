import { Component, OnInit } from '@angular/core';
import { RecipeService } from '@app/_services/api/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '@interfaces/Recipe';
import { RecipeDetailResponse } from '@interfaces/responseInterface/RecipeDetailResponse';
import recipemodkdata from '@app/mockdata/recipe';
import { UserService } from '@app/_services/api/user.service';
import { NotificationService } from '@app/_services/notification.service';
import { StorageService } from '@app/_services/storage.service';
import { CommentService } from '@app/_services/api/comment.service';
import { RecipeDetail } from '@interfaces/RecipeDetail';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import { RECIPE_ROUTES } from '@app/recipe/recipe.module';
import { PopupService } from '@app/_services/popup.service';

@Component({
  selector: 'app-page-recipe',
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.css',
})
export class RecipePageComponent implements OnInit {
  recipeId = this.route.snapshot.params['id'];
  recipe: RecipeDetail | undefined;
  portions = 0;
  isFavorite = false;
  newComment = '';
  $isMine = new BehaviorSubject<boolean>(false);

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private userService: UserService,
              private notificationService: NotificationService,
              private storageService: StorageService,
              private commentService: CommentService,
              private router: Router,
              private popupService: PopupService,
  ) {

  }

  ngOnInit() {
    console.log('ici page recipe');

    if (!this.recipeId) {
      console.error('No recipe id provided');
      return;
    }

    // Observable to get recipe details
    const recipeObservable = this.recipeService.getRecipeById(this.recipeId).pipe(
      map((recipeResponse) => {
        this.recipe = new RecipeDetail((recipeResponse));
        this.portions = this.recipe.portions;
      }),
    );

    // Observable to check if recipe is favorite
    const favoriteObservable = this.storageService.isLoggedIn() ?
      this.userService.getMyFavRecipes().pipe(
        map(data => data.some((fav) => fav.id == this.recipeId)),
      ) :
      of(false);

    const isMineObservable = combineLatest([
      this.storageService.getUsername(),
      recipeObservable.pipe(map(() => this.recipe?.ownerUsername)),
    ]).pipe(
      map(([username, ownerUsername]) => {
          console.log('u', username, ownerUsername);
          return username == ownerUsername;
        },
      ),
    );

    // Subscribe to combined observables to update isMine
    combineLatest([
      favoriteObservable,
      isMineObservable,
    ]).subscribe(([isFavorite, isMine]) => {
      this.isFavorite = isFavorite;
      this.$isMine.next(isMine);
      console.log('ismine', isMine);
    });

  }

  getPictures() {
    if (!this.recipe) {
      return [];
    }
    return this.recipe.pictures;
  }

  decreasePortions() {
    if (this.portions > 1) {
      this.portions--;
    }
  }

  increasePortions() {
    this.portions++;
  }

  onDeleteRecipe() {
    this.popupService.showConfirmationPopup('Supression', 'Etes-vous sûr de vouloir supprimer cette recette ?', () => {
        if (!this.recipe) {
          return;
        }

        this.recipeService.deleteRecipe(this.recipe.id).subscribe({
          next: () => {
            this.notificationService.openSnackBarSuccess('Recipe deleted', 'Close');
            this.router.navigate(['/', RECIPE_ROUTES.path]);
          },
          error: err => {
            this.notificationService.openSnackBarError(err.error.messsage, 'Close');
          },
        });
      },
    );
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
          this.notificationService.openSnackBarError(err.error.messsage, 'Close');
        },
      });
    } else {
      this.userService.addRecipeFav(this.recipe.id).subscribe({
        next: data => {
          this.notificationService.openSnackBarSuccess('Recipe added to favorites', 'Close');
        },
        error: err => {
          this.notificationService.openSnackBarError(err.error.messsage, 'Close');
        },
      });
    }

    this.isFavorite = !this.isFavorite;
  }

  addComment() {
    this.commentService.postComment(this.recipeId, { text: this.newComment }).subscribe({
      next: data => {
        this.notificationService.openSnackBarSuccess('Comment added', 'Close');
      },
      error: err => {
        this.notificationService.openSnackBarError(err.error.messsage, 'Close');
      },
    });
  }


  protected readonly RECIPE_ROUTES = RECIPE_ROUTES;
}
