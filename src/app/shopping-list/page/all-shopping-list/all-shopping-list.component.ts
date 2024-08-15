import { Component, OnInit } from '@angular/core';
import { ShoppingListResponse } from '@interfaces/responseInterface/ShoppingListResponse';
import { ShoppingListService } from '@app/_services/api/shopping-list.service';
import { Router } from '@angular/router';
import { SHOPPING_LIST_ROUTES } from '@app/shopping-list/shopping-list.module';
import { PopupService } from '@app/_services/popup.service';
import { PopupType } from '@app/_shared/component/popup/popup.model';

@Component({
  selector: 'app-all-shopping-list',
  templateUrl: './all-shopping-list.component.html',
  styleUrl: './all-shopping-list.component.css',
})
export class AllShoppingListComponent implements OnInit {

  shopingList: ShoppingListResponse[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router,
    private popupService: PopupService,
  ) {
  }

  ngOnInit(): void {
    this.shoppingListService.getUserShoppingLists().subscribe((response) => {
      this.shopingList = response;
    });
  }

  onClickCard(id: number): void {
    this.router.navigate(['/', SHOPPING_LIST_ROUTES.path, id]);
  }

  onCreateList(): void {
    this.popupService.showPopup({
      type: PopupType.Input,
      title: 'Creer une nouvelle liste',
      description: 'Entrez le nom de votre nouvelle liste',
      confirmButton: 'Creer',
      callback: (name) => {
        this.shoppingListService.createShoppingList(name as string).subscribe((response) => {
          this.router.navigate(['/', SHOPPING_LIST_ROUTES.path, response.id]);
        });
      },
    });
  }

}
