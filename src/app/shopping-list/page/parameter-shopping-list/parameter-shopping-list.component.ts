import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingListSharedService } from '@app/_services/api/shopping-list-shared.service';

@Component({
  selector: 'app-parameter-shopping-list',
  templateUrl: './parameter-shopping-list.component.html',
  styleUrl: './parameter-shopping-list.component.css'
})
export class ParameterShoppingListComponent implements OnInit {

  shoppingListId = this.route.snapshot.params['id'];


  constructor(
    private route: ActivatedRoute,
    private shoppingListSharedService: ShoppingListSharedService,
  ) {
  }

  ngOnInit(): void {
    if (!this.shoppingListId) {
      return;
    }


  }

}
