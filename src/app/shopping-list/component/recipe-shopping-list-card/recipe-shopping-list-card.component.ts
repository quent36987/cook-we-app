import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipeShoppingListResponse } from '@interfaces/responseInterface/RecipeShoppingListResponse';

@Component({
  selector: 'app-recipe-shopping-list-card',
  templateUrl: './recipe-shopping-list-card.component.html',
  styleUrl: './recipe-shopping-list-card.component.css'
})
export class RecipeShoppingListCardComponent {

  @Input() recipeShoppingList!: RecipeShoppingListResponse;

  @Output() increasePortion : EventEmitter<number> = new EventEmitter<number>();
  @Output() decreasePortion : EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteRecipeShoppingList : EventEmitter<number> = new EventEmitter<number>();
}
