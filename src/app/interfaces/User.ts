import { UserResponse } from '@interfaces/responseInterface/UserResponse';
import { UserDetailResponse, UserDetailResponseSchema } from '@interfaces/responseInterface/UserDetailResponse';

export class User {
  public username: string;
  public firstname: undefined | string;

  constructor(user : UserResponse | UserDetailResponse){
    this.username = user.username;
  }

}
