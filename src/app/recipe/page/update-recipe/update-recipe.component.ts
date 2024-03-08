import { Component, OnInit } from '@angular/core';
import { RecipeService } from '@app/_services/api/recipe.service';
import { NotificationService } from '@app/_services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureService } from '@app/_services/api/picture.service';
import { EmitRecipeForm } from '@app/recipe/component/recipe-form/recipe-form.component';
import { RecipeDetail } from '@interfaces/RecipeDetail';

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
        this.notificationService.openSnackBarError(err.error, 'Close');
      },
    });
  }


  onSubmitted(recipeRequest: EmitRecipeForm) {
    this.recipeService.putRecipe(this.recipeId, recipeRequest).subscribe({
      next: (data) => {
        this.notificationService.openSnackBarSuccess('Recette mis a jour', 'Close');

        // for (let i = 0; i < recipeRequest.pictures.length; i++) {
        //   this.pictureService.postPicture(recipeRequest.pictures[i], data.id).subscribe({
        //     next: (data) => {
        //       console.log('picture created', data);
        //     },
        //     error: (error) => {
        //       console.error('An error occurred', error);
        //     },
        //   });
        // }

        setTimeout(() => {
          this.router.navigate(['/recipe', data.id]);
        }, 1500);
      },
      error: (error) => {
        console.error('An error occurred', error);
        this.notificationService.openSnackBarError('Erreur lors de la mis a jour de la recette', 'Close');
        this.canSubmit = true;
      },
    });
  }

}
