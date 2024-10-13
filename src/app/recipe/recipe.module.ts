import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecipeComponent } from '@app/recipe/page/create-recipe/create-recipe.component';
import { UpdateRecipeComponent } from '@app/recipe/page/update-recipe/update-recipe.component';
import { RecipePageComponent } from '@app/recipe/page/recipe/recipe-page.component';
import { RecipeFormComponent } from '@app/recipe/component/recipe-form/recipe-form.component';
import { MatIcon } from '@angular/material/icon';
import {  MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDivider } from '@angular/material/divider';
import { RecipeComponent } from '@app/recipe/recipe/recipe.component';
import { MatButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import {  MatInputModule } from '@angular/material/input';
import { TimeFormat } from '@utils/format/time-format';
import { TypeFormat } from '@utils/format/type-format';
import { SeasonFormat } from '@utils/format/season-format';
import { UnitFormat } from '@utils/format/unit-format';
import { SearchComponent } from '@app/recipe/page/search/search.component';
import { RecipeCardListComponent } from '@app/_shared/component/recipe-card-list/recipe-card-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChip, MatChipOption } from '@angular/material/chips';
import { MatSelect } from '@angular/material/select';
import { IsLoginGuard } from '@utils/guard/IsLoginGuard';
import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HowCreateComponent } from '@app/recipe/component/how-create/how-create.component';
import { PictureFormComponent } from '@app/recipe/component/picture-form/picture-form.component';
import { AllRecipesComponent } from '@app/recipe/page/all-recipes/all-recipes.component';

export const RECIPE_ROUTES = {
  path: 'recipe',
  create: 'create',
  update: 'update',
  search: 'search',
  all: 'all',
  detail: '',
};

export const recipeRoutes: Routes = [
  {
    path: '',
    component: RecipeComponent,
    children: [
      { path: RECIPE_ROUTES.create, component: CreateRecipeComponent, canActivate: [IsLoginGuard] },
      { path: `${RECIPE_ROUTES.update}/:id`, component: UpdateRecipeComponent },
      { path: RECIPE_ROUTES.search, component: SearchComponent },
      { path: RECIPE_ROUTES.all, component: AllRecipesComponent},
      { path: '', redirectTo: RECIPE_ROUTES.search, pathMatch: 'full' },
      { path: ':id', component: RecipePageComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AllRecipesComponent,
    RecipePageComponent,
    CreateRecipeComponent,
    UpdateRecipeComponent,
    RecipeFormComponent,
    RecipeComponent,
    SearchComponent,
    HowCreateComponent,
    PictureFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(recipeRoutes),
    MatIcon,
    MatLabel,
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
    MatButton,
    TimeFormat,
    TypeFormat,
    SeasonFormat,
    UnitFormat,
    NgOptimizedImage,
    RecipeCardListComponent,
    MatIconButton,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatChip,
    MatSelect,
    MatChipOption,
    MatProgressSpinnerModule
  ],
  exports: [],
})
export class RecipeModule {
}
