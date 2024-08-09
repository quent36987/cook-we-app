import { Component, EventEmitter, Output } from '@angular/core';
import { NotificationService } from '@app/_services/notification.service';
import { RecipeDetail } from '@interfaces/RecipeDetail';
import { AutoService } from '@app/_services/api/auto.service';
import { SpinnerService } from '@app/_services/spinner.service';

@Component({
  selector: 'app-how-create',
  templateUrl: './how-create.component.html',
  styleUrl: './how-create.component.css',
})
export class HowCreateComponent {

  @Output() recipe: EventEmitter<RecipeDetail | null> = new EventEmitter();

  constructor(private notificationService: NotificationService,
              private autoService: AutoService,
              private spinnerService: SpinnerService,
  ) {
  }

  createRecipe() {
    this.recipe.emit(null);
  }

  createRecipeFromText() {
    console.log('todo');
    this.recipe.emit(null);
  }

  onPictureSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.spinnerService.showSpinner();
      this.autoService.generateRecipeWithPicture(file).subscribe({
        next: (data) => {
          this.spinnerService.hideSpinner();
          let recipe = new RecipeDetail(data);

          if (recipe.portions === 0) {
            recipe.portions = 1;
          }

          this.recipe.emit(recipe);
        },
        error: () => {
          this.spinnerService.hideSpinner();
          this.notificationService.openSnackBarError('Erreur lors la création', 'Close');
        },
      });
    }
  }
}
