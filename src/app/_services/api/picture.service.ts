import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  HTTP_OPTIONS } from '@app/_services/constante';
import { Observable } from 'rxjs';
import { parseResponse } from '@app/_services/parseResponse';
import { MessageResponse, MessageResponseSchema } from '@interfaces/responseInterface/MessageResponse';
import {
  RecipePictureResponse,
  RecipePictureResponseSchema,
} from '@interfaces/responseInterface/RecipePictureResponse';
import { API_URL } from '@app/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class PictureService {
  constructor(private http: HttpClient) {
  }

  public getPictureUrlByRecipeId(id: number): Observable<RecipePictureResponse> {
    return this.http.get<RecipePictureResponse>(
      API_URL + '/pictures/recipes/' + id,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(RecipePictureResponseSchema),
    );
  }

  public getPictureByFilename(filename: string): Observable<Blob> {
    return this.http.get<Blob>(
      API_URL + '/pictures/' + filename,
      HTTP_OPTIONS,
    );
  }

  public postPicture(picture: File, recipeId: number): Observable<RecipePictureResponse> {
    const formData = new FormData();
    formData.append('file', picture, picture.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<RecipePictureResponse>(
      API_URL + '/pictures/recipes/' + recipeId,
      formData,
      { headers },
    ).pipe(
      parseResponse(RecipePictureResponseSchema),
    );
  }

  public deletePicture(filename: string): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(
      API_URL + '/pictures/' + filename,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(MessageResponseSchema),
    );
  }
}
