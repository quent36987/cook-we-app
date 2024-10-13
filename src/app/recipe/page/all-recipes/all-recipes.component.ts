import { Component, OnInit, HostListener } from '@angular/core';
import { Recipe } from '@interfaces/Recipe';
import { RecipeService } from '@app/_services/api/recipe.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  page: number = -1;
  total: number = 0;
  index: number = 0;
  isLoading: boolean = false;

  constructor(private recipeService: RecipeService) {}

  getMoreRecipes() {
    if (this.total !== 0 && this.index >= this.total || this.isLoading)
      return;

    this.isLoading = true;

    this.recipeService.getAllRecipes({ page: this.page + 1 }).subscribe({
      next: page => {
        this.recipes.push(...page.content.map(r => new Recipe(r)));
        this.page = page.page;
        this.total = page.totalElements;
        this.index = this.recipes.length;
      },
      error: (error) => {
        console.error('Erreur :', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.getMoreRecipes();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 100) {
      this.getMoreRecipes();
    }
  }
}
