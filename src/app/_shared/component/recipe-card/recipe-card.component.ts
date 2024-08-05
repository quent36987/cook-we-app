import { Component, Input } from '@angular/core';
import { Recipe } from '@interfaces/Recipe';
import { CommonModule, NgIf, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TimeFormat } from '@utils/format/time-format';
import { TypeFormat } from '@utils/format/type-format';
import { SeasonFormat } from '@utils/format/season-format';
import { TitleFormat } from '@utils/format/title-format';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatProgressBar,
    NgOptimizedImage,
    TimeFormat,
    TypeFormat,
    SeasonFormat,
    TitleFormat,
  ],
  styleUrl: './recipe-card.component.css',
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;

  thumbnail() {
    const thumbnail = this.recipe.getPictureUrl()?.at(0);

    return thumbnail ? thumbnail : "../../../../assets/logo.jpg";
  }
}
