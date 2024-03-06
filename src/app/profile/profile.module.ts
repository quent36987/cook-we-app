import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '@app/profile/profile/profile.component';
import { ProfilePageComponent } from '@app/profile/page/profile/profile-page.component';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MyRecipesComponent } from '@app/profile/page/my-recipes/my-recipes.component';
import { FavoritesComponent } from '@app/profile/page/favorites/favorites.component';
import { RouterModule, Routes } from '@angular/router';
import { RecipeCardListComponent } from '@app/_shared/component/recipe-card-list/recipe-card-list.component';

export const PROFILE_ROUTES = {
  path: 'profile',
  recipes: 'recipes',
  favorites: 'favorites',
};

const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', component: ProfilePageComponent },
      { path: PROFILE_ROUTES.recipes, component: MyRecipesComponent },
      { path: PROFILE_ROUTES.favorites, component: FavoritesComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ProfileComponent,
    ProfilePageComponent,
    MyRecipesComponent,
    FavoritesComponent,
  ],
  imports: [
    CommonModule,
    MatIcon,
    MatProgressSpinner,
    RouterModule.forChild(profileRoutes),
    RecipeCardListComponent,
  ],
})
export class ProfileModule {
}
