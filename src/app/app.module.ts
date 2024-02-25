import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { NgOptimizedImage } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { RecipeCardListComponent } from './components/recipe-card-list/recipe-card-list.component';
import { HomeComponent } from './page/home/home.component';
import { RecipeComponent } from '@app/page/recipe/recipe.component';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatFabButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FavoritesComponent } from '@app/page/favorites/favorites.component';
import { ProfileComponent } from '@app/page/profile/profile.component';
import { CreateRecipeComponent } from '@app/page/create-recipe/create-recipe.component';
import { RecipeFormComponent } from '@app/components/recipe-form/recipe-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatDivider } from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecipeCardComponent,
    HeaderComponent,
    SearchBarComponent,
    RecipeCardListComponent,
    HomeComponent,
    RecipeComponent,
    FavoritesComponent,
    ProfileComponent,
    CreateRecipeComponent,
    RecipeFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    MatIconModule,
    MatProgressBar,
    MatCard,
    MatCardModule,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatCardActions,
    MatInput,
    MatButton,
    MatProgressSpinner,
    MatIconButton,
    MatPrefix,
    MatSuffix,
    MatFabButton,
    MatFormFieldModule,
    MatInputModule,
    MatMiniFabButton,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatOption,
    ReactiveFormsModule,
    MatDivider,

  ],
  providers: [httpInterceptorProviders, provideAnimationsAsync()],
  bootstrap: [AppComponent],
  exports: [
    RecipeCardListComponent,
  ],
})
export class AppModule {
}
