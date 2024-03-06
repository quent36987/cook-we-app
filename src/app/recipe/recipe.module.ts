import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecipeComponent } from '@app/recipe/page/create-recipe/create-recipe.component';
import { UpdateRecipeComponent } from '@app/recipe/page/update-recipe/update-recipe.component';
import { RecipePageComponent } from '@app/recipe/page/recipe/recipe-page.component';
import { RecipeCardComponent } from '@app/recipe/component/recipe-card/recipe-card.component';
import { RecipeCardListComponent } from '@app/recipe/component/recipe-card-list/recipe-card-list.component';
import { RecipeFormComponent } from '@app/recipe/component/recipe-form/recipe-form.component';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDivider } from '@angular/material/divider';
import { RecipeComponent } from '@app/recipe/recipe/recipe.component';


const recipeRoutes: Routes = [
  {
    path: '',
    component: RecipeComponent,
    children: [
      { path: 'create', component: CreateRecipeComponent },
      { path: 'update/:id', component: UpdateRecipeComponent },
      { path: ':id', component: RecipePageComponent },
    ],
  },
];

@NgModule({
  declarations: [
    RecipePageComponent,
    CreateRecipeComponent,
    UpdateRecipeComponent,
    RecipeCardComponent,
    RecipeCardListComponent,
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
  exports: [
    RecipeCardListComponent,
  ],
})
export class RecipeModule {
}
