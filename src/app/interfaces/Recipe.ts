import { User } from './User';
import { RecipeStep } from './RecipeStep';
import { RecipePicture } from './RecipePicture';
import { Ingredient } from './Ingredient';
import { RecipeComment } from './RecipeComment';
import { ESeason } from './ESeason';
import { RecipeDetailResponse } from '@interfaces/responseInterface/RecipeDetailResponse';
import { ESeasonToString, StringToESeason, StringToEType } from '@utils/converts';
import { RecipeRequest } from '@interfaces/requestInterface/RecipeRequest';
import { EType } from '@interfaces/EType';


export class Recipe {
  public id: number;
  public name: string;
  public time: number;
  public portions: number;
  public season: ESeason;
  public type: EType;
  public user: User;
  public steps: RecipeStep[];
  public pictures: RecipePicture[];
  public ingredients: Ingredient[];
  public comments: RecipeComment[];

  constructor(recipe: RecipeDetailResponse) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.steps = recipe.steps.map(s => new RecipeStep(s));
    this.user = new User(recipe.user);
    this.ingredients = recipe.ingredients.map(i => new Ingredient(i));
    this.pictures = recipe.pictures.map(p => new RecipePicture(p));
    this.season = StringToESeason(recipe.season);
    this.type = StringToEType(recipe.type);
    this.time = recipe.time;
    this.portions = recipe.portions;
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
