import { RecipePictureResponse } from './RecipePictureResponse';
import { RecipeStepResponse } from './RecipeStepResponse';
import { UserResponse } from './UserResponse';

export interface RecipeResponse {
  id: number;
  name: string;
  time: number;
  portions: number;
  season: string;
  user: UserResponse;
  steps: RecipeStepResponse[];
  pictures: RecipePictureResponse[];
}
