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


const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: 'login' },
    ],
  },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    MatCardHeader,
    MatCardModule,
    MatCard,
    FormsModule,
    MatFormField,
    MatCardContent,
    MatProgressSpinner,
    MatIcon,
    MatCardFooter,
    MatInput,
    MatButton,
  ],
})
export class AuthModule {
}
