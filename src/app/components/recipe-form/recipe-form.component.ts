import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RecipeRequest } from '@interfaces/requestInterface/RecipeRequest';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EUnit } from '@interfaces/EUnit';
import { ingredientsExemple } from '@app/components/recipe-form/constante';
import { AuthService } from '@app/_services/api/auth.service';
import { StorageService } from '@app/_services/storage.service';
import { NotificationService } from '@app/_services/notification.service';
import { EType } from '@interfaces/EType';
import { ESeason } from '@interfaces/ESeason';
import { Recipe } from '@interfaces/Recipe';
import { Event } from '@angular/router';
import { RecipeDetail } from '@interfaces/RecipeDetail';


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

  @Output() submitForm: EventEmitter<EmitRecipeForm> = new EventEmitter();

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

  addStep() {
    const step = this.formBuilder.group({
      text: ['', Validators.required],
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


  addIngredient() {
    const ingredient = this.formBuilder.group({
      quantity: ['', Validators.required],
      unit: [EUnit.PIECE, Validators.required],
      name: ['', Validators.required],
    });

    this.ingredientForms.push(ingredient);
  }

  get pictureForms() {
    return this.formGroup.get('pictures') as FormArray;
  }

  removePicture(index: number) {
    this.pictureForms.removeAt(index);
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


  onFileSelected(event: any, i: number): void {
    this.pictureForms.at(i).setValue({ file: event.target.files[0] as File });
  }

  protected readonly EType = EType;
  protected readonly ESeason = ESeason;
}
