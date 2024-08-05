import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { RecipeRequest } from '@interfaces/requestInterface/RecipeRequest';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EUnit } from '@interfaces/EUnit';
import { ingredientsExemple } from '@app/recipe/component/recipe-form/constante';
import { AuthService } from '@app/_services/api/auth.service';
import { StorageService } from '@app/_services/storage.service';
import { NotificationService } from '@app/_services/notification.service';
import { EType } from '@interfaces/EType';
import { ESeason } from '@interfaces/ESeason';
import { RecipeDetail } from '@interfaces/RecipeDetail';
import { AutoService } from '@app/_services/api/auto.service';
import { RecipeStep } from '@interfaces/RecipeStep';
import { Ingredient } from '@interfaces/Ingredient';


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

  fileName = '';
  private files: File[] = [];
  private objectURLs: string[] = [];

  onPictureSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      console.log('file', file);
      this.autoService.generateRecipeWithPicture(file).subscribe({
        next: (data) => {
          console.log('picture creatyjyujed', data);
          this.formGroup.patchValue({
            name: data.name,
            type: data.type,
            season: data.season,
            portions: data.portions,
            time: data.time,
            steps: data.steps.map((step: { text: string }) => step.text),
            ingredients: data.ingredients,
          });
        },
        error: (error) => {
          console.error('An error occurred', error);
        },
      });
    }
  }

  units = [
    { value: EUnit.PIECE, viewValue: 'pièce' },
    { value: EUnit.GRAM, viewValue: 'g' },
    { value: EUnit.CUP, viewValue: 'tasse' },
    { value: EUnit.MILLILITER, viewValue: 'ml' },
    { value: EUnit.TABLESPOON, viewValue: 'cuillère à soupe' },
    { value: EUnit.TEASPOON, viewValue: 'cuillère à café' },
  ];

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private storageService: StorageService,
              private notificationService: NotificationService,
              private autoService: AutoService,
              private cdr: ChangeDetectorRef
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      season: ['', Validators.required],
      portions: ['', Validators.required],
      time: ['', Validators.required],
      ingredients: this.formBuilder.array([]),
      steps: this.formBuilder.array([]),
      pictures: this.formBuilder.array([]),
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
        time: this.recipe.time,
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
      time: form.time,
      portions: form.portions,
      type: form.type,
      season: form.season,
      steps: form.steps.map((step: { text: string }) => step.text),
      ingredients: form.ingredients,
      pictures: form.pictures.map((picture: { file: File }) => picture.file),
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

  get pictureForms() {
    return this.formGroup.get('pictures') as FormArray;
  }


  removePicture(index: number) {
    this.pictureForms.removeAt(index);
    this.files.splice(index, 1);
    URL.revokeObjectURL(this.objectURLs[index]);
    this.objectURLs.splice(index, 1);
  }

  addPicture() {
    const picture = this.formBuilder.group({
      file: [''],
    });

    this.pictureForms.push(picture);
  }

  onFileChange(event: any) {
    console.log('onFileChange');
    console.log(event);
  }

  getImageUrl(index: number): string {
    return this.objectURLs[index] || '';
  }

  onFileSelected(event: any, i: number): void {
    const file = event.target.files[0] as File;
    if (file) {
      this.files[i] = file;

      const objectURL = URL.createObjectURL(file);
      if (this.objectURLs[i]) {
        URL.revokeObjectURL(this.objectURLs[i]); // Clean up previous URL if it exists
      }
      this.objectURLs[i] = objectURL;
    }
  }

  ngOnDestroy() {
    this.objectURLs.forEach(url => URL.revokeObjectURL(url));
  }

  protected readonly EType = EType;
  protected readonly ESeason = ESeason;
}
