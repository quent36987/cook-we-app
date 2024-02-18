import { RecipePictureResponse } from '@interfaces/responseInterface/RecipePictureResponse';

export class RecipePicture {
  public imageUrl: string;

  constructor(picture : RecipePictureResponse) {
    this.imageUrl = picture.imageUrl;
  }
}
