import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecipeComponent } from '@app/recipe/page/create-recipe/create-recipe.component';
import { UpdateRecipeComponent } from '@app/recipe/page/update-recipe/update-recipe.component';
import { RecipePageComponent } from '@app/recipe/page/recipe/recipe-page.component';
import { RecipeFormComponent } from '@app/recipe/component/recipe-form/recipe-form.component';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDivider } from '@angular/material/divider';
import { RecipeComponent } from '@app/recipe/recipe/recipe.component';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { TimeFormat } from '@utils/format/time-format';
import { TypeFormat } from '@utils/format/type-format';
import { SeasonFormat } from '@utils/format/season-format';
import { UnitFormat } from '@utils/format/unit-format';

export const RECIPE_ROUTES = {
  path: 'recipe',
  create: 'create',
  update: 'update',
  detail: '',
};

export const recipeRoutes: Routes = [
  {
    path: '',
    component: RecipeComponent,
    children: [
      { path: RECIPE_ROUTES.create, component: CreateRecipeComponent },
      { path: `${RECIPE_ROUTES.update}/:id`, component: UpdateRecipeComponent },
      { path: ':id', component: RecipePageComponent },
    ],
  },
];

@NgModule({
  declarations: [
    RecipePageComponent,
    CreateRecipeComponent,
    UpdateRecipeComponent,
    RecipeFormComponent,
    RecipeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(recipeRoutes),
    MatIcon,
    MatLabel,
    MatFormField,
    MatButtonToggleGroup,
    MatButtonToggle,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    MatProgressBar,
    MatDivider,
    FormsModule,
    MatMiniFabButton,
    MatInput,
    MatButton,
    TimeFormat,
    TypeFormat,
    SeasonFormat,
    UnitFormat,
  ],
  exports: [],
})
export class RecipeModule {
}
