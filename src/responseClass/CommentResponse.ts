import { UserResponse } from './UserResponse';

export interface CommentResponse {
  id: number;
  recipeId: number;
  text: string;
  user: UserResponse;
  created: string;
}
