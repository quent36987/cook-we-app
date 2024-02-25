import { RecipeComment } from '@interfaces/RecipeComment';
import { RecipePicture } from '@interfaces/RecipePicture';
import { Recipe } from '@interfaces/Recipe';
import { RecipeDetailResponse } from '@interfaces/responseInterface/RecipeDetailResponse';
import { Ingredient } from '@interfaces/Ingredient';
import { RecipeRequest } from '@interfaces/requestInterface/RecipeRequest';

export class RecipeDetail extends Recipe {
  public ingredients: Ingredient[];
  public comments: RecipeComment[];

  constructor(recipe: RecipeDetailResponse) {

    super(recipe);
    this.ingredients = recipe.ingredients.map(i => new Ingredient(i));

    this.comments = recipe.comments.map(c => new RecipeComment(c));
  }

  public ingredientCount(): number {
    return this.ingredients.length;
  }

  public toRecipeRequest(): RecipeRequest {
    return {
      name: this.name,
      time: this.time,
      portions: this.portions,
      season: this.season,
      type: this.type,
      steps: this.steps.map(s => s.text),
      ingredients: this.ingredients.map(i => i.toIngredientRequest()),
    };
  }

  public getIngredientsForPortion(portion: number): Ingredient[] {
    return this.ingredients.map(i => new Ingredient({
      name: i.name,
      quantity: i.quantity * portion / this.portions,
      unit: i.unit,
    }));
  }
}
