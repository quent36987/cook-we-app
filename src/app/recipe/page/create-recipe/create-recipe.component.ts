import { Component, OnInit } from '@angular/core';
import { RecipeService } from '@app/_services/api/recipe.service';
import { NotificationService } from '@app/_services/notification.service';
import { Router } from '@angular/router';
import { PictureService } from '@app/_services/api/picture.service';
import { EmitRecipeForm } from '@app/recipe/component/recipe-form/recipe-form.component';
import { RECIPE_ROUTES } from '@app/recipe/recipe.module';
import { RecipeDetail } from '@interfaces/RecipeDetail';
import { SpinnerService } from '@app/_services/spinner.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css',
})
export class CreateRecipeComponent implements OnInit {

  canSubmit = true;
  chooseSelected: boolean = false;
  recipe!: RecipeDetail | null;

  constructor(private recipeService: RecipeService,
              private notificationService: NotificationService,
              private router: Router,
              private pictureService: PictureService,
              private spinnerService: SpinnerService,
  ) {
  }

  ngOnInit() {
    this.chooseSelected = false;
    console.log('init create recipe');
  }

  OnChooseSelected(event: RecipeDetail | null) {
    this.chooseSelected = true;
    this.recipe = event;
  }

  onSubmitted(recipeRequest: EmitRecipeForm) {
    this.canSubmit = false;
    this.spinnerService.showSpinner();

    this.recipeService.postRecipe(recipeRequest).subscribe({
      next: (data) => {
        this.notificationService.openSnackBarSuccess('Recette créée', 'Close');
        for (const element of recipeRequest.pictures) {
          this.pictureService.postPicture(element, data.id).subscribe();
        }

        setTimeout(() => {
          this.spinnerService.hideSpinner();
          this.router.navigate(['/', RECIPE_ROUTES.path, data.id]);
        }, 1000);
      },
      error: () => {
        this.notificationService.openSnackBarError('Erreur lors de la création de la recette', 'Close');
        this.canSubmit = true;
        this.spinnerService.hideSpinner();
      },
    });
  }

}
