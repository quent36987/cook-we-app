import { CreateIngredientRequest } from '@interfaces/requestInterface/CreateIngredientRequest';
import { EType } from '@interfaces/EType';
import { ESeason } from '@interfaces/ESeason';

export interface RecipeRequest {
  name: string;
  time: number;
  portions: number;
  season: ESeason;
  type: EType;
  steps: string[];
  ingredients: CreateIngredientRequest[];
}
