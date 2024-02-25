import { CreateIngredientRequest } from '@interfaces/requestInterface/CreateIngredientRequest';

export interface RecipeRequest {
  name: string;
  time: number;
  portions: number;
  season: string;
  type: string;
  steps: string[];
  ingredients: CreateIngredientRequest[];
}
