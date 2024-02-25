import { Component } from '@angular/core';
import { RecipeRequest } from '@interfaces/requestInterface/RecipeRequest';
import { RecipeService } from '@app/_services/api/recipe.service';
import { NotificationService } from '@app/_services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css',
})
export class CreateRecipeComponent {

  canSubmit = true;

  constructor(private recipeService: RecipeService,
              private notificationService: NotificationService,
              private router: Router,
  ) {
  }

  onSubmitted(recipeRequest: RecipeRequest) {
    console.log('Recipe created', recipeRequest);
    // this.canSubmit = false;
    //
    // this.recipeService.postRecipe(recipeRequest).subscribe({
    //   next: (data) => {
    //     this.notificationService.openSnackBarSuccess('Recette créée', 'Close');
    //
    //     setTimeout(() => {
    //       this.router.navigate(['/recipe', data.id]);
    //     }, 2000);
    //   },
    //   error: (error) => {
    //     console.error('An error occurred', error);
    //     this.notificationService.openSnackBarError('Erreur lors de la création de la recette', 'Close');
    //     this.canSubmit = true;
    //   },
    // });
  }

}
