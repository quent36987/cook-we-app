import { Component, Input } from '@angular/core';
import { Recipe } from '../../interfaces/Recipe';

@Component({
  selector: 'app-recipe-card-list',
  templateUrl: './recipe-card-list.component.html',
  styleUrl: './recipe-card-list.component.css'
})
export class RecipeCardListComponent {
  @Input() recipes: Recipe[] = [];
}
