import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '@app/shared/page/home/home.component';
import { HeaderComponent } from '@app/shared/component/header/header.component';
import { SearchBarComponent } from '@app/shared/component/search-bar/search-bar.component';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { RecipeModule } from '@app/recipe/recipe.module';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    MatIcon,
    RouterLink,
  ],
  exports: [
    HomeComponent,
    HeaderComponent,
  ],
})
export class SharedModule {
}
