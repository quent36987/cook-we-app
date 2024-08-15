import { Component } from '@angular/core';
import { ShoppingListDetailResponse } from '@interfaces/responseInterface/ShoppingListDetailResponse';
import { ActivatedRoute } from '@angular/router';
import { ShoppingListService } from '@app/_services/api/shopping-list.service';
import { NotificationService } from '@app/_services/notification.service';
import { SpinnerService } from '@app/_services/spinner.service';
import { SHOPPING_LIST_ROUTES } from '@app/shopping-list/shopping-list.module';

@Component({
  selector: 'app-detail-shopping-list',
  templateUrl: './detail-shopping-list.component.html',
  styleUrl: './detail-shopping-list.component.css'
})
export class DetailShoppingListComponent {

  shoppingListId = this.route.snapshot.params['id'];

  shoppingList: ShoppingListDetailResponse | undefined;

  constructor(private route: ActivatedRoute,
              private shoppingListService: ShoppingListService,
              private notificationService: NotificationService,
              private spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    if (!this.shoppingListId) {
      console.error('No shopping list id provided');
      return;
    }

    this.spinnerService.showSpinner();
    this.shoppingListService.getShoppingListById(this.shoppingListId).subscribe({
      next: (shoppingList: ShoppingListDetailResponse) => {
        this.shoppingList = shoppingList;
      },
      error: err => {
        this.notificationService.openSnackBarError(err.error, 'Close');
      },
      complete: () => {
        this.spinnerService.hideSpinner();
      },
    });
  }

  protected readonly SHOPPING_LIST_ROUTES = SHOPPING_LIST_ROUTES;
}
