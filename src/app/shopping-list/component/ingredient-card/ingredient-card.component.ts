import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IngredientShoppingListResponse } from '@interfaces/responseInterface/IngredientShoppingListResponse';

@Component({
  selector: 'app-ingredient-card',
  templateUrl: './ingredient-card.component.html',
  styleUrl: './ingredient-card.component.css',
})
export class IngredientCardComponent {

  @Output() deleteIngredient: EventEmitter<void> = new EventEmitter<void>();
  @Output() editIngredient: EventEmitter<IngredientShoppingListResponse> = new EventEmitter<IngredientShoppingListResponse>();

  @Input() ingredient!: IngredientShoppingListResponse;
  @Input() editMode = true;

  constructor() {
  }

  onDelete() {
    this.deleteIngredient.emit();
  }

  onUpdate() {
    this.editIngredient.emit(this.ingredient);
  }
}
