import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '@app/profile/profile/profile.component';
import { ProfilePageComponent } from '@app/profile/page/profile/profile-page.component';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MyRecipesComponent } from '@app/profile/page/my-recipes/my-recipes.component';
import { FavoritesComponent } from '@app/profile/page/favorites/favorites.component';
import { RecipeModule } from '@app/recipe/recipe.module';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';

const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', component: ProfilePageComponent },
      { path: 'recipes', component: MyRecipesComponent },
      { path: 'favorites', component: FavoritesComponent },
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
    RecipeModule,
    RouterOutlet,
    RouterModule.forChild(profileRoutes),
  ],
})
export class ProfileModule {
}
