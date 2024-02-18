import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, HTTP_OPTIONS } from '@app/_services/constante';
import { Observable } from 'rxjs';
import { parseResponse } from '@app/_services/parseResponse';
import { MessageResponse, MessageResponseSchema } from '@interfaces/responseInterface/MessageResponse';
import {
  RecipePictureResponse,
  RecipePictureResponseSchema,
} from '@interfaces/responseInterface/RecipePictureResponse';


@Injectable({
  providedIn: 'root',
})
export class PictureService {
  constructor(private http: HttpClient) {
  }

  public getPictureUrlByRecipeId(id: number) : Observable<RecipePictureResponse>{
    return this.http.get<RecipePictureResponse>(
      API_URL + '/pictures/recipes/' + id,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(RecipePictureResponseSchema),
    );
  }

  public getPictureByFilename(filename: string) : Observable<Blob> {
    return this.http.get<Blob>(
      API_URL + '/pictures/' + filename,
      HTTP_OPTIONS,
    );
  }

  public postPicture(picture: Blob, filename: string) : Observable<RecipePictureResponse> {
    return this.http.post<RecipePictureResponse>(
      API_URL + '/pictures/' + filename,
      picture,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(RecipePictureResponseSchema),
    );
  }

  public deletePicture(filename: string) : Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(
      API_URL + '/pictures/' + filename,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(MessageResponseSchema),
    );
  }
}
