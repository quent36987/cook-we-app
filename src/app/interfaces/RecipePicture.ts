import { RecipePictureResponse } from '@interfaces/responseInterface/RecipePictureResponse';
import { API_URL } from '@app/environments/environment';

export class RecipePicture {
  public imageUrl: string;
  public id: number;
  public ownerUsername: string;
  public createdAt: string;

  constructor(picture : RecipePictureResponse) {
    this.imageUrl = picture.imageUrl;
    this.id = picture.id;
    this.ownerUsername = picture.ownerUsername;
    this.createdAt = picture.createdAt
  }

  public getPictureUrl(): string {
    return `${API_URL}/pictures/${this.imageUrl}`;
  }
}
