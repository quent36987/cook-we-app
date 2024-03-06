import { Component, OnInit } from '@angular/core';
import { RecipeResponse } from '@interfaces/responseInterface/RecipeResponse';
import { UserService } from '@app/_services/api/user.service';
import { StorageService } from '@app/_services/storage.service';
import { NotificationService } from '@app/_services/notification.service';
import { Router } from '@angular/router';
import { Recipe } from '@interfaces/Recipe';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.css',
})
export class MyRecipesComponent implements OnInit {

  recipes!: Recipe[];
  isWaiting = false;

  constructor(private userService: UserService,
              private storageService: StorageService,
              private notificationService: NotificationService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (!this.storageService.isLoggedIn()) {
      this.notificationService.openSnackBarError('You need to be logged in to view your recipe', 'Close');

      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 1000);
    } else {
      this.isWaiting = true;
      this.userService.getMyRecipes().subscribe({
        next: data => {
          this.isWaiting = false;
          this.recipes = data.map(r => new Recipe(r));
        },
        error: err => {
          this.isWaiting = false;
          this.notificationService.openSnackBarError(err.error, 'Close');
        },
      });
    }
  }

}
