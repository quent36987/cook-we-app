import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipeShoppingListResponse } from '@interfaces/responseInterface/RecipeShoppingListResponse';
import { Router } from '@angular/router';
import { RECIPE_ROUTES } from '@app/recipe/recipe.module';
import { API_URL } from '@app/environments/environment';

@Component({
  selector: 'app-recipe-shopping-list-card',
  templateUrl: './recipe-shopping-list-card.component.html',
  styleUrl: './recipe-shopping-list-card.component.css',
})
export class RecipeShoppingListCardComponent {

  @Input() recipeShoppingList!: RecipeShoppingListResponse;

  @Output() changePortion: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteRecipeShoppingList: EventEmitter<number> = new EventEmitter<number>();

  constructor(private router: Router) {
  }


  thumbnail() {
    const thumbnail = this.recipeShoppingList.imageUrl;

    return thumbnail ? `${API_URL}/pictures/${thumbnail}` : '../../../../assets/logo.jpg';
  }

  increase() {
    this.recipeShoppingList.portion = this.recipeShoppingList.portion + 1;
    this.changePortion.emit(this.recipeShoppingList.portion);
  }

  decrease() {
    if (this.recipeShoppingList.portion === 1) {
      return;
    }
    this.recipeShoppingList.portion = this.recipeShoppingList.portion - 1;
    this.changePortion.emit(this.recipeShoppingList.portion);
  }

  delete() {
    this.deleteRecipeShoppingList.emit(this.recipeShoppingList.id);
  }

  onCardClick() {
    this.router.navigate(['/', RECIPE_ROUTES.path, this.recipeShoppingList.recipeId]);
  }
}
