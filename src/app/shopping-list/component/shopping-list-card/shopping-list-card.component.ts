import { Component, Input } from '@angular/core';
import { ShoppingListResponse } from '@interfaces/responseInterface/ShoppingListResponse';

@Component({
  selector: 'app-shopping-list-card',
  templateUrl: './shopping-list-card.component.html',
  styleUrl: './shopping-list-card.component.css'
})
export class ShoppingListCardComponent {

  @Input() shoppingList!: ShoppingListResponse;
  @Input() showOwner = false;
}
