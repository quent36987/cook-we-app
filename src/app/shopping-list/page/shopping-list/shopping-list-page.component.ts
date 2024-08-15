import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingListService } from '@app/_services/api/shopping-list.service';
import { NotificationService } from '@app/_services/notification.service';
import { SpinnerService } from '@app/_services/spinner.service';
import { ShoppingListDetailResponse } from '@interfaces/responseInterface/ShoppingListDetailResponse';
import { ShoppingListIngredientService } from '@app/_services/api/shopping-list-ingredient.service';
import { SHOPPING_LIST_ROUTES } from '@app/shopping-list/shopping-list.module';
import { ShoppingListIngredientRequest } from '@interfaces/requestInterface/ShoppingListIngresdientRequest';
import { IngredientShoppingListResponse } from '@interfaces/responseInterface/IngredientShoppingListResponse';
import { ShoppingListRecipeService } from '@app/_services/api/shopping-list-recipe.service';
import { PopupService } from '@app/_services/popup.service';
import { StorageService } from '@app/_services/storage.service';
import { ShoppingListRecipeRequest } from '@interfaces/requestInterface/ShoppingListRecipeRequest';
import { RecipeShoppingListResponse } from '@interfaces/responseInterface/RecipeShoppingListResponse';
import { Recipe } from '@interfaces/Recipe';
import { map } from 'rxjs/operators';
import { RecipeDetail } from '@interfaces/RecipeDetail';
import { RecipeService } from '@app/_services/api/recipe.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list-page.component.html',
  styleUrl: './shopping-list-page.component.css',
})
export class ShoppingListPageComponent implements OnInit {

  protected readonly SHOPPING_LIST_ROUTES = SHOPPING_LIST_ROUTES;

  shoppingListId = this.route.snapshot.params['id'];

  shoppingList: ShoppingListDetailResponse | undefined;
  username: string | undefined;

  recipePopup = false;

  ingredientEmpty: IngredientShoppingListResponse = {
    id: null,
    name: '',
    shoppingListRecipeId: null,
    checked: false,
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private shoppingListService: ShoppingListService,
              private notificationService: NotificationService,
              private spinnerService: SpinnerService,
              private shoppingListIngredientService: ShoppingListIngredientService,
              private shoppingListRecipeService: ShoppingListRecipeService,
              private popupService: PopupService,
              private storageService: StorageService,
              private recipeService: RecipeService,
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
        this.notificationService.openSnackBarError(err.error, 'Close');
      },
      complete: () => {
        this.spinnerService.hideSpinner();
      },
    });

    this.storageService.getUsername().subscribe({
      next: (username: string) => {
        this.username = username;
      },
    });
  }

  ingredientExtra() {
    return this.shoppingList?.ingredients.filter(ingredient => ingredient.shoppingListRecipeId === null);
  }


  onIngredientChange(event: IngredientShoppingListResponse) {
    if (event.name === '') {
      return;
    }
    const ingredientRequest: ShoppingListIngredientRequest = {
      id: event.id,
      name: event.name,
    };

    this.shoppingListIngredientService.addOrUpdateIngredient(this.shoppingListId, ingredientRequest).subscribe({
      next: (response: IngredientShoppingListResponse) => {
        if (!event.id) {
          this.shoppingList?.ingredients.push(response);
        }
        this.ingredientEmpty.name = '';
      },
      error: err => {
        this.notificationService.openSnackBarError(err.error, 'Close');
      },
    });
  }

  onDeleteIngredient(ingredientId: number | null) {
    if (ingredientId === null) {
      return;
    }

    this.shoppingListIngredientService.deleteIngredient(ingredientId).subscribe({
      next: () => {
        if (!this.shoppingList) {
          return;
        }

        this.shoppingList.ingredients = this.shoppingList?.ingredients.filter((ingredient) => ingredient.id !== ingredientId);
      },
      error: err => {
        this.notificationService.openSnackBarError(err.error, 'Close');
      },
    });
  }

  onDeleteRecipe(shoppingListRecipeId: number | null) {
    if (shoppingListRecipeId === null) {
      return;
    }

    this.shoppingListRecipeService.removeRecipe(this.shoppingListId, shoppingListRecipeId).subscribe({
      next: () => {
        if (!this.shoppingList) {
          return;
        }

        this.shoppingList.recipes = this.shoppingList?.recipes.filter((recipe) => recipe.id !== shoppingListRecipeId);
        this.shoppingList.ingredients = this.shoppingList?.ingredients.filter((ingredient) => ingredient.shoppingListRecipeId !== shoppingListRecipeId);
      },
      error: err => {
        this.notificationService.openSnackBarError(err.error, 'Close');
      },
    });
  }

  onDeleteShoppingList() {
    if (!this.shoppingList) {
      return;
    }

    this.popupService.showConfirmationPopup('Suppression', 'Etes-vous sûr de vouloir supprimer cette liste ?', () => {
      this.shoppingListService.deleteShoppingList(this.shoppingListId).subscribe({
        next: () => {
          this.notificationService.openSnackBarSuccess('Shopping list deleted', 'Close');
          this.router.navigate(['/', SHOPPING_LIST_ROUTES.path]);
        },
        error: err => {
          this.notificationService.openSnackBarError(err.error, 'Close');
        },
      });
    });
  }

  togglePopupSearch() {
    this.recipePopup = !this.recipePopup;
  }

  changePortions(recipeId: number, portion: number) {
    console.log('Change portions', recipeId, portion);
    this.addRecipe(recipeId, portion);
  }

  addRecipe(recipeId: number, portion: number = 0) {
    console.log('Add recipe', recipeId, portion);
    this.recipeService.getRecipeById(recipeId).subscribe({
      next: (recipeResponse) => {
        const recipe = new RecipeDetail((recipeResponse));

        const recipeRequest: ShoppingListRecipeRequest = {
          recipeId: recipeId,
          portion: portion === 0 ? recipe.portions : portion,
          ingredients: recipe.getIngredientsForPortion(portion === 0 ? recipe.portions : portion).map(ingredient => {
            return `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`;
          }),
        };

        this.shoppingListRecipeService.addOrUpdateRecipe(this.shoppingListId, recipeRequest).subscribe({
          next: (response: RecipeShoppingListResponse) => {
            if (portion === 0 && this.shoppingList) {
              this.shoppingList.recipes.push(response);
            }
          },
          error: err => {
            this.notificationService.openSnackBarError(err.error, 'Close');
          },
        });
      },
      error: err => {
        this.notificationService.openSnackBarError(err.error, 'Close');
      },
    });
  }

}
