import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeRequest } from '@interfaces/requestInterface/RecipeRequest';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EUnit } from '@interfaces/EUnit';
import { CreateIngredientRequest } from '@interfaces/requestInterface/CreateIngredientRequest';
import { ingredientsExemple } from '@app/components/recipe-form/constante';
import { AuthService } from '@app/_services/api/auth.service';
import { StorageService } from '@app/_services/storage.service';
import { NotificationService } from '@app/_services/notification.service';

interface formGroup {
  name: string;
  time: number;
  portions: number;
  season: string;
  steps: string[];
  ingredients: CreateIngredientRequest[];
}

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css',
})
export class RecipeFormComponent implements OnInit {
  @Input() recipe!: RecipeRequest | null;
  @Input() canSubmit = true;

  @Output() submitForm: EventEmitter<RecipeRequest> = new EventEmitter();

  units: string[] = Object.values(EUnit);

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

  protected readonly EUnit = EUnit;


  getRecipeRequest(): RecipeRequest {
    const form = this.formGroup.value;

    return {
      name: form.name,
      time: form.time,
      portions: form.portions,
      type: form.type,
      season: form.season,
      steps: form.steps.map((step: { text: string }) => step.text),
      ingredients: form.ingredients,
    };
  }

  onSubmit(form: FormGroup) {
    console.log('submit');
    console.log(form);

    console.log(form.value);

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
      unit: ['', Validators.required],
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
      url: ['', Validators.required],
    });

    this.pictureForms.push(picture);
  }

  onFileChange(event: any) {
    console.log('onFileChange');
    console.log(event);
  }
}
