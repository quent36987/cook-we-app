import { Component, OnInit } from '@angular/core';
import { RecipeService } from '@app/_services/api/recipe.service';
import { NotificationService } from '@app/_services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureService } from '@app/_services/api/picture.service';
import { EmitRecipeForm } from '@app/recipe/component/recipe-form/recipe-form.component';
import { RecipeDetail } from '@interfaces/RecipeDetail';
import { RECIPE_ROUTES } from '@app/recipe/recipe.module';
import { SpinnerService } from '@app/_services/spinner.service';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrl: './update-recipe.component.css',
})
export class UpdateRecipeComponent implements OnInit {

  recipeId = this.route.snapshot.params['id'];
  canSubmit = true;
  recipe!: RecipeDetail;

  constructor(private recipeService: RecipeService,
              private notificationService: NotificationService,
              private router: Router,
              private route: ActivatedRoute,
              private pictureService: PictureService,
              private spinnerService: SpinnerService,
  ) {
  }

  ngOnInit() {
    if (!this.recipeId) {
      return;
    }

    this.recipeService.getRecipeById(this.recipeId).subscribe({
      next: data => {
        this.recipe = new RecipeDetail(data);
      },
      error: err => {
        this.notificationService.openSnackBarError(err.error.message, 'Close');
      },
    });
  }


  onSubmitted(recipeRequest: EmitRecipeForm) {
    this.spinnerService.showSpinner();
    this.recipeService.putRecipe(this.recipeId, recipeRequest).subscribe({
      next: (data) => {
        this.notificationService.openSnackBarSuccess('Recette mis a jour', 'Close');

        for (let i = 0; i < recipeRequest.pictures.length; i++) {
          this.pictureService.postPicture(recipeRequest.pictures[i], data.id).subscribe({
            error: (error) => {
              console.error('An error occurred', error);
            },
          });
        }

        setTimeout(() => {
          this.spinnerService.hideSpinner();
          this.router.navigate(['/', RECIPE_ROUTES.path, data.id]);
        }, 1000);
      },
      error: () => {
        this.spinnerService.hideSpinner();
        this.notificationService.openSnackBarError('Erreur lors de la mis a jour de la recette', 'Close');
        this.canSubmit = true;
      },
    });
  }

}
