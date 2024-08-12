import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RecipeRequest } from '@interfaces/requestInterface/RecipeRequest';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EUnit } from '@interfaces/EUnit';
import { ingredientsExemple } from '@app/recipe/component/recipe-form/constante';
import { StorageService } from '@app/_services/storage.service';
import { NotificationService } from '@app/_services/notification.service';
import { EType } from '@interfaces/EType';
import { ESeason } from '@interfaces/ESeason';
import { RecipeDetail } from '@interfaces/RecipeDetail';
import { RecipeStep } from '@interfaces/RecipeStep';
import { Ingredient } from '@interfaces/Ingredient';
import { convertToMinutes, convertToTimeString, timeFormatValidator } from '@utils/converter/time-converter';
import { RecipePicture } from '@interfaces/RecipePicture';
import { PictureService } from '@app/_services/api/picture.service';
import { SpinnerService } from '@app/_services/spinner.service';


export interface EmitRecipeForm extends RecipeRequest {
  pictures: File[];
}

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
})
export class RecipeFormComponent implements OnInit {
  @Input() recipe!: RecipeDetail | null;
  @Input() canSubmit = true;
  @Input() buttonSubmitText = 'Ajouter';

  @Output() submitForm: EventEmitter<EmitRecipeForm> = new EventEmitter();

  private files: File[] = [];
  public objectURLs: string[] = [];
  public formGroup: FormGroup;

  units = [
    { value: EUnit.PIECE, viewValue: 'pièce' },
    { value: EUnit.GRAM, viewValue: 'g' },
    { value: EUnit.CUP, viewValue: 'tasse' },
    { value: EUnit.MILLILITER, viewValue: 'ml' },
    { value: EUnit.TABLESPOON, viewValue: 'cuillère à soupe' },
    { value: EUnit.TEASPOON, viewValue: 'cuillère à café' },
    { value: EUnit.POT, viewValue: 'pot' },
    { value: EUnit.PINCH, viewValue: 'pincée' },
  ];

  constructor(private formBuilder: FormBuilder,
              private storageService: StorageService,
              private notificationService: NotificationService,
              private pictureService: PictureService,
              private spinnerService: SpinnerService,
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      season: ['', Validators.required],
      portions: ['', Validators.required],
      time: ['', [Validators.required, timeFormatValidator()]],
      ingredients: this.formBuilder.array([]),
      steps: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    if (!this.storageService.isLoggedIn()) {
      this.notificationService.openSnackBarError('You need to be logged in to create a recipe', 'Close');
      return;
    }

    if (this.recipe) {
      this.formGroup.patchValue({
        name: this.recipe.name,
        type: this.recipe.type,
        season: this.recipe.season,
        portions: this.recipe.portions,
        time: convertToTimeString(this.recipe.time),
      });

      this.recipe.steps.forEach((step) => {
        this.addStep(step);
      });

      this.recipe.ingredients.forEach((ingredient) => {
        this.addIngredient(ingredient);
      });
    }
  }

  public _filter(index: number): string[] {
    const value = this.formGroup.get('ingredients')?.value[index].name;
    const filterValue = value.toLowerCase();

    return ingredientsExemple.filter(option => option.toLowerCase().includes(filterValue));
  }

  getRecipeRequest(): EmitRecipeForm {
    const form = this.formGroup.value;

    return {
      name: form.name,
      time: convertToMinutes(form.time),
      portions: form.portions,
      type: form.type,
      season: form.season,
      steps: form.steps.map((step: { text: string }) => step.text),
      ingredients: form.ingredients,
      pictures: this.files,
    };
  }

  onSubmit(form: FormGroup) {
    if (!this.formGroup.valid) {
      this.notificationService.openSnackBarError('Please fill all the required fields', 'Close');
    }

    this.submitForm.emit(this.getRecipeRequest());
  }

  get stepForms() {
    return this.formGroup.get('steps') as FormArray;
  }

  addStep(stepRecipe: RecipeStep | null = null) {
    const step = this.formBuilder.group({
      text: [stepRecipe?.text ?? '', Validators.required],
    });
    this.stepForms.push(step);
  }

  removeStep(index: number) {
    this.stepForms.removeAt(index);
  }

  get ingredientForms() {
    return this.formGroup.get('ingredients') as FormArray;
  }

  removeIngredient(index: number) {
    this.ingredientForms.removeAt(index);
  }

  takePicture() {
    console.log('take picture');
  }


  addIngredient(ingredient: Ingredient | null = null) {
    this.ingredientForms.push(this.formBuilder.group({
      quantity: [ingredient?.quantity ?? '', Validators.required],
      unit: [ingredient?.unit ?? EUnit.PIECE, Validators.required],
      name: [ingredient?.name ?? '', Validators.required],
    }));
  }

  removeSavedPicture(picture: RecipePicture) {
    console.log('delete');
    this.pictureService.deletePicture(picture.imageUrl).subscribe({
      next: () => {
        this.recipe?.pictures.splice(this.recipe.pictures.indexOf(picture), 1);
      },
      error: (error) => {
        this.notificationService.openSnackBarError('Erreur lors de la suppression de l\'image', 'Close');
      },
    });
  }

  removePicture(index: number) {
    this.files.splice(index, 1);
    URL.revokeObjectURL(this.objectURLs[index]);
    this.objectURLs.splice(index, 1);
  }



  getImageUrl(index: number): string {
    return this.objectURLs[index] || '';
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0] as File;
    if (file) {
      this.files.push(file);

      const objectURL = URL.createObjectURL(file);
      this.objectURLs.push(objectURL);
    }
  }

  ngOnDestroy() {
    this.objectURLs.forEach(url => URL.revokeObjectURL(url));
  }

  protected readonly EType = EType;
  protected readonly ESeason = ESeason;
}
