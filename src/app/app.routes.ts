import { Routes } from '@angular/router';
import { HomeComponent } from '@app/_shared/component/home/home.component';
import { AppComponent } from '@app/app.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'recipe', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
