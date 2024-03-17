import { Component, OnInit } from '@angular/core';
import { Recipe } from '@interfaces/Recipe';
import { RecipeService } from '@app/_services/api/recipe.service';
import { RecipeCardListComponent } from '@app/_shared/component/recipe-card-list/recipe-card-list.component';
import { MatIcon } from '@angular/material/icon';
import { PROFILE_ROUTES } from '@app/profile/profile.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css',
  imports: [
    RecipeCardListComponent,
    MatIcon,
    RouterLink,
  ],
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {

  }

  ngOnInit(): void {
    this.recipeService.getAllRecipes(
      { page: 0, size: 3 }
    ).subscribe({
    next: data => {
      this.recipes = data.content.map(r => new Recipe(r));
    },
    error: err => {
      console.log(err);
    },
  });
  }

  protected readonly PROFILE_ROUTES = PROFILE_ROUTES;
}
