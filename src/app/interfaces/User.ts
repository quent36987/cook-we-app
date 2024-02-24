import { UserResponse } from '@interfaces/responseInterface/UserResponse';
import { UserDetailResponse, UserDetailResponseSchema } from '@interfaces/responseInterface/UserDetailResponse';

export class User {
  public username: string;

  constructor(user: UserResponse) {
    this.username = user.username;
  }
}

export class UserDetail extends User {
  public firstName: string | null;
  public lastName: string | null;
  public email: string;

  constructor(user: UserDetailResponse) {
    super(user);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
  }
}
