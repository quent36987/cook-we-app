import { Component, OnInit } from '@angular/core';
import { RecipeRequest } from '@interfaces/requestInterface/RecipeRequest';
import { RecipeService } from '@app/_services/api/recipe.service';
import { NotificationService } from '@app/_services/notification.service';
import { Router } from '@angular/router';
import { PictureService } from '@app/_services/api/picture.service';
import { EmitRecipeForm } from '@app/recipe/component/recipe-form/recipe-form.component';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css',
})
export class CreateRecipeComponent implements OnInit {

  canSubmit = true;

  constructor(private recipeService: RecipeService,
              private notificationService: NotificationService,
              private router: Router,
              private pictureService: PictureService,
  ) {
  }

  ngOnInit() {
    console.log('init create recipe');
  }

  onSubmitted(recipeRequest: EmitRecipeForm) {
    console.log('recipeRequest', recipeRequest);
    this.canSubmit = false;

    this.recipeService.postRecipe(recipeRequest).subscribe({
      next: (data) => {
        this.notificationService.openSnackBarSuccess('Recette créée', 'Close');

        for (let i = 0; i < recipeRequest.pictures.length; i++) {
          this.pictureService.postPicture(recipeRequest.pictures[i], data.id).subscribe({
            next: (data) => {
              console.log('picture created', data);
            },
            error: (error) => {
              console.error('An error occurred', error);
            },
          });
        }

        setTimeout(() => {
          this.router.navigate(['/recipe', data.id]);
        }, 2000);
      },
      error: (error) => {
        console.error('An error occurred', error);
        this.notificationService.openSnackBarError('Erreur lors de la création de la recette', 'Close');
        this.canSubmit = true;
      },
    });
  }

}
