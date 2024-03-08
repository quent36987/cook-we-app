import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@app/auth/page/login/login.component';
import { RegisterComponent } from '@app/auth/page/register/register.component';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { AuthComponent } from '@app/auth/auth/auth.component';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { A } from '@angular/cdk/keycodes';

export const AUTH_ROUTES = {
  path: 'auth',
  login: 'login',
  register: 'register',
};


const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: AUTH_ROUTES.login, component: LoginComponent },
      { path: AUTH_ROUTES.register, component: RegisterComponent },
      { path: '**', redirectTo: AUTH_ROUTES.login },
    ],
  },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    MatCardModule,
    FormsModule,
    MatFormField,
    MatCardContent,
    MatProgressSpinner,
    MatIcon,
    MatInput,
    MatButton,
  ],
})
export class AuthModule {
}
