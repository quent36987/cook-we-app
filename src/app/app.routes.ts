import { Routes } from '@angular/router';
import { HomeComponent } from '@app/_shared/component/home/home.component';
import { AppComponent } from '@app/app.component';
import { PROFILE_ROUTES } from '@app/profile/profile.module';
import { AUTH_ROUTES } from '@app/auth/auth.module';
import { RECIPE_ROUTES } from '@app/recipe/recipe.module';
import { IsLoginGuard } from '@utils/guard/IsLoginGuard';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: PROFILE_ROUTES.path,
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
  },
  { path: AUTH_ROUTES.path, loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: RECIPE_ROUTES.path, loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule) },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
