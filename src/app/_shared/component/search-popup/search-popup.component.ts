import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '@interfaces/Recipe';
import { RecipeService } from '@app/_services/api/recipe.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, NgForOf } from '@angular/common';
import { RecipeCardComponent } from '@app/_shared/component/recipe-card/recipe-card.component';
import { RecipeCardListComponent } from '@app/_shared/component/recipe-card-list/recipe-card-list.component';

@Component({
  selector: 'app-search-popup',
  standalone: true,
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.css'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    RecipeCardComponent,
    RecipeCardListComponent,
    NgIf,
    NgForOf
  ],
})
export class SearchPopupComponent {
  recipes: Recipe[] = [];
  searchText: string = '';

  @Output() onClickRecipe = new EventEmitter<number>();
  @Output() closePopup = new EventEmitter<void>();

  constructor(private recipeService: RecipeService) {}

  onSearch() {
    console.log('Recherche :', this.searchText);

    this.recipeService.getAllRecipes({
      name: this.searchText,
      type: [],
      season: []
    }).subscribe({
      next: page => {
        this.recipes = page.content.map(r => new Recipe(r));
        console.log('Recettes :', this.recipes);
      },
      error: (error) => {
        console.error('Erreur :', error);
      }
    });
  }

  clearSearch() {
    this.searchText = '';
    this.onSearch();
  }

  onClick(recipeId: number) {
    this.onClickRecipe.emit(recipeId);
    this.closePopup.emit();
  }

  togglePopupSearch() {
    this.closePopup.emit();
  }

}
