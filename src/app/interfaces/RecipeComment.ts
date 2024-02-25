import { User } from './User';
import { CommentResponse } from '@interfaces/responseInterface/CommentResponse';

export class RecipeComment {
  public id: number;
  public recipeId: number;
  public text: string;
  public user: User;
  public createdAt: string;

  constructor(comment : CommentResponse){
    this.id = comment.id;
    this.recipeId = comment.recipeId;
    this.createdAt = comment.createdAt;
    this.text = comment.text;
    this.user = new User(comment.user);
  }

}
