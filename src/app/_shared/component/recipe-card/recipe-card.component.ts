import { Component, Input } from '@angular/core';
import { Recipe } from '@interfaces/Recipe';
import { CommonModule, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatProgressBar,
  ],
  styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
}
