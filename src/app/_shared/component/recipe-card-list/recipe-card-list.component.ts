import { Component, Input } from '@angular/core';
import { Recipe } from '@interfaces/Recipe';
import { RouterLink } from '@angular/router';
import { RecipeCardComponent } from '@app/_shared/component/recipe-card/recipe-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-card-list',
  templateUrl: './recipe-card-list.component.html',
  standalone: true,
  imports: [
    RouterLink,
    RecipeCardComponent,
    CommonModule,
  ],
  styleUrl: './recipe-card-list.component.css',
})
export class RecipeCardListComponent {
  @Input() recipes: Recipe[] = [];
}
