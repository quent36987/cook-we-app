import { User } from './User';
import { RecipeStep } from './RecipeStep';
import { RecipePicture } from './RecipePicture';
import { Ingredient } from './Ingredient';
import { RecipeComment } from './RecipeComment';
import { ESeason } from './ESeason';


export interface Recipe {
  id: number;
  name: string;
  time: number;
  portions: number;
  season: ESeason;
  user: User;
  steps: RecipeStep[];
  pictures: RecipePicture[];
  ingredients: Ingredient[];
  comments: RecipeComment[];
}
