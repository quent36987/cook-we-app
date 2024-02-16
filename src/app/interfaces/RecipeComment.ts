import { User } from './User';

export interface RecipeComment {
  id: number;
  recipeId: number;
  text: string;
  user: User;
  created: string;
}
