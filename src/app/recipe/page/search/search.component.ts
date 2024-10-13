import { Component } from '@angular/core';
import { Recipe } from '@interfaces/Recipe';
import { RecipeService } from '@app/_services/api/recipe.service';
import { EType } from '@interfaces/EType';
import { ESeason } from '@interfaces/ESeason';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  recipes : Recipe[] = [];
  searchText: string = '';

  selectedFiltersType: EType[] = [];
  filtersType: EType[] = [EType.DESSERT,EType.PLAT,EType.ENTREE];

  selectedFiltersSeason: ESeason[] = [];
  filtersSeason: ESeason[] = [ESeason.AUTUMN,ESeason.SPRING,ESeason.SUMMER,ESeason.WINTER];


  constructor(
    private recipeService: RecipeService
  ) {
  }

  onSearch() {
    console.log('Recherche :', this.searchText);

    this.recipeService.getAllRecipes(
      { name: this.searchText,
        type: this.selectedFiltersType,
        season: this.selectedFiltersSeason.length >= 1 ? [...this.selectedFiltersSeason, ESeason.ALL] : []
      }
    ).subscribe({
      next: page => {
        this.recipes = page.content.map(r => new Recipe(r));
      },
      error: (error) => {
        console.error('Erreur :', error);
      }
    });
  }

  clearSearch() {
    this.searchText = '';
  }

  toggleTypeFilter(filter: EType) {
    if (this.selectedFiltersType.includes(filter)) {
      this.removeTypeFilter(filter);
    } else {
      this.selectedFiltersType.push(filter);
    }

    this.onSearch();
  }

  toggleSeasonFilter(filter: ESeason) {
    if (this.selectedFiltersSeason.includes(filter)) {
      this.removeSeasonFilter(filter);
    } else {
      this.selectedFiltersSeason.push(filter);
    }

    this.onSearch();
  }

  removeTypeFilter(filter: EType) {
    const index = this.selectedFiltersType.indexOf(filter);
    if (index >= 0) {
      this.selectedFiltersType.splice(index, 1);
    }
  }

  removeSeasonFilter(filter: ESeason) {
    const index = this.selectedFiltersSeason.indexOf(filter);
    if (index >= 0) {
      this.selectedFiltersSeason.splice(index, 1);
    }
  }
}
