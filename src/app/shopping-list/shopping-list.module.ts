import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from '@app/shopping-list/shopping-list/shopping-list.component';
import { AllShoppingListComponent } from '@app/shopping-list/page/all-shopping-list/all-shopping-list.component';
import {
  ShoppingListCardComponent,
} from '@app/shopping-list/component/shopping-list-card/shopping-list-card.component';
import {
  RecipeShoppingListCardComponent,
} from '@app/shopping-list/component/recipe-shopping-list-card/recipe-shopping-list-card.component';
import { MatIcon } from '@angular/material/icon';
import { ShoppingListPageComponent } from '@app/shopping-list/page/shopping-list/shopping-list-page.component';
import { MatDivider } from '@angular/material/divider';
import { IngredientCardComponent } from '@app/shopping-list/component/ingredient-card/ingredient-card.component';
import { FormsModule } from '@angular/forms';
import {
  DetailShoppingListComponent
} from '@app/shopping-list/page/detail-shopping-list/detail-shopping-list.component';
import {
  ParameterShoppingListComponent
} from '@app/shopping-list/page/parameter-shopping-list/parameter-shopping-list.component';
import { SearchPopupComponent } from '@app/_shared/component/search-popup/search-popup.component';


export const SHOPPING_LIST_ROUTES = {
  path: 'shopping-list',
  detail: 'detail',
  parameters: 'parameters',
};

export const shoppingListRoutes: Routes = [
  {
    path: '',
    component: ShoppingListComponent,
    children: [
      {
        path: `${SHOPPING_LIST_ROUTES.detail}/:id`, component: DetailShoppingListComponent,
      },
      {
        path: `${SHOPPING_LIST_ROUTES.parameters}/:id`, component: ParameterShoppingListComponent,
      },
      {
        path: '',
        component: AllShoppingListComponent,
      },
      {
        path: ':id', component: ShoppingListPageComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ShoppingListComponent,
    AllShoppingListComponent,
    ShoppingListCardComponent,
    RecipeShoppingListCardComponent,
    ShoppingListPageComponent,
    IngredientCardComponent,
    DetailShoppingListComponent,
    ParameterShoppingListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(shoppingListRoutes),
    MatIcon,
    MatDivider,
    FormsModule,
    SearchPopupComponent,
  ],
  exports: [],
})
export class ShoppingListModule {
}
