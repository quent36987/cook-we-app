import { CreateIngredientRequest } from '@interfaces/requestInterface/CreateIngredientRequest';

export interface CreateRecipeRequest {
  name: string;
  time: number;
  portions: number;
  season: string;
  steps: string[];
  ingredients: CreateIngredientRequest[];
}
