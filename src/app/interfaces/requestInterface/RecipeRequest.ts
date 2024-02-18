import { CreateIngredientRequest } from '@interfaces/requestInterface/CreateIngredientRequest';

export interface RecipeRequest {
  name: string;
  time: number;
  portions: number;
  season: string;
  steps: string[];
  ingredients: CreateIngredientRequest[];
}
