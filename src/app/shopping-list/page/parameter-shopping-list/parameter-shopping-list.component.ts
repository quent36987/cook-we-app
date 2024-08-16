import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingListSharedService } from '@app/_services/api/shopping-list-shared.service';
import { ShoppingListDetailResponse } from '@interfaces/responseInterface/ShoppingListDetailResponse';
import { ShoppingListService } from '@app/_services/api/shopping-list.service';
import { NotificationService } from '@app/_services/notification.service';
import { SpinnerService } from '@app/_services/spinner.service';
import { PopupService } from '@app/_services/popup.service';
import { PopupType } from '@app/_shared/component/popup/popup.model';

@Component({
  selector: 'app-parameter-shopping-list',
  templateUrl: './parameter-shopping-list.component.html',
  styleUrl: './parameter-shopping-list.component.css',
})
export class ParameterShoppingListComponent implements OnInit {


  shoppingListId = this.route.snapshot.params['id'];

  shoppingList: ShoppingListDetailResponse | undefined;

  constructor(private route: ActivatedRoute,
              private shoppingListService: ShoppingListService,
              private notificationService: NotificationService,
              private spinnerService: SpinnerService,
              private shoppingListSharedService: ShoppingListSharedService,
              private popupService: PopupService,
  ) {
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
        this.notificationService.openSnackBarError(err.error.messsage, 'Close');
      },
      complete: () => {
        this.spinnerService.hideSpinner();
      },
    });
  }

  onDeleteUser(username: string) {
    this.shoppingListSharedService.removeUserFromShoppingList(this.shoppingListId, username).subscribe({
      next: () => {
        this.notificationService.openSnackBarSuccess('Utilisateur supprimé de la liste', 'Close');
        this.shoppingList?.sharedUsers.splice(this.shoppingList.sharedUsers.indexOf(username), 1);
      },
      error: err => {
        this.notificationService.openSnackBarError(err.error.messsage, 'Close');
      },
    });
  }

  addUser() {
    this.popupService.showPopup({
      type: PopupType.Input,
      title: 'Ajouter un utilisateur',
      description: `Rentrer le nom d'utilisateur de la personne à ajouter à la liste`,
      confirmButton: 'Ajouter',
      callback: (username) => {
        if (!username) {
          return;
        }

        this.shoppingListSharedService.addUserToShoppingList(this.shoppingListId, username).subscribe({
          next: () => {
            this.notificationService.openSnackBarSuccess('Utilisateur ajouté à la liste', 'Close');
            this.shoppingList?.sharedUsers.push(username);
          },
          error: err => {
            console.log(err);
            this.notificationService.openSnackBarError(err.error.messsage, 'Close');
          },
        });
      },
    });
  }

}
