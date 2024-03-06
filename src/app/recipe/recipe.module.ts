import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecipeComponent } from '@app/recipe/page/create-recipe/create-recipe.component';
import { UpdateRecipeComponent } from '@app/recipe/page/update-recipe/update-recipe.component';
import { RecipePageComponent } from '@app/recipe/page/recipe/recipe-page.component';
import { RecipeCardComponent } from '@app/_shared/component/recipe-card/recipe-card.component';
import { RecipeCardListComponent } from '@app/_shared/component/recipe-card-list/recipe-card-list.component';
import { RecipeFormComponent } from '@app/recipe/component/recipe-form/recipe-form.component';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDivider } from '@angular/material/divider';
import { RecipeComponent } from '@app/recipe/recipe/recipe.component';

export const RECIPE_ROUTES = {
  path: 'recipe',
  create: 'create',
  update: 'update/:id',
  detail: ':id',
};

export const recipeRoutes: Routes = [
  {
    path: '',
    component: RecipeComponent,
    children: [
      { path: RECIPE_ROUTES.create, component: CreateRecipeComponent },
      { path: RECIPE_ROUTES.update, component: UpdateRecipeComponent },
      { path: RECIPE_ROUTES.detail, component: RecipePageComponent },
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
  ],
  exports: [],
})
export class RecipeModule {
}
