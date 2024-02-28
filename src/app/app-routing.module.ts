import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { HomeComponent } from './page/home/home.component';
import { RecipeComponent } from '@app/page/recipe/recipe.component';
import { FavoritesComponent } from '@app/page/favorites/favorites.component';
import { ProfileComponent } from '@app/page/profile/profile.component';
import { CreateRecipeComponent } from '@app/page/create-recipe/create-recipe.component';
import { MyRecipesComponent } from '@app/page/my-recipes/my-recipes.component';
import { UpdateRecipeComponent } from '@app/page/update-recipe/update-recipe.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'recipe/:recipeId', component: RecipeComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'my-recipes', component: MyRecipesComponent },
  { path: 'create-recipe', component: CreateRecipeComponent },
  { path: 'update-recipe/:recipeId', component: UpdateRecipeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
