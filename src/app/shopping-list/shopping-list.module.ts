import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from '@app/shopping-list/shopping-list/shopping-list.component';
import { AllShoppingListComponent } from '@app/shopping-list/page/all-shopping-list/all-shopping-list.component';
import {
  ShoppingListCardComponent
} from '@app/shopping-list/component/shopping-list-card/shopping-list-card.component';
import {
  RecipeShoppingListCardComponent
} from '@app/shopping-list/component/recipe-shopping-list-card/recipe-shopping-list-card.component';
import { MatIcon } from '@angular/material/icon';



export const SHOPPING_LIST_ROUTES = {
  path : 'shopping-list',
};

export const  shoppingListRoutes: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
    children: []
  },
];

@NgModule({
  declarations: [
    ShoppingListComponent,
    AllShoppingListComponent,
    ShoppingListCardComponent,
    RecipeShoppingListCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(shoppingListRoutes),
    MatIcon,
  ],
  exports: [],
})
export class ShoppingListModule {
}
