import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL, HTTP_OPTIONS } from '@app/_services/constante';
import { Observable } from 'rxjs';
import { parseResponse } from '@app/_services/parseResponse';
import { RecipeDetailResponse, RecipeDetailResponseSchema } from '@interfaces/responseInterface/RecipeDetailResponse';


@Injectable({
  providedIn: 'root',
})
export class AutoService {
  constructor(private http: HttpClient) {
  }

  public generateRecipeWithPicture(picture: File): Observable<RecipeDetailResponse> {
    const formData = new FormData();
    formData.append('file', picture, picture.name);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<RecipeDetailResponse>(
      API_URL + '/auto/generate-recipe',
      formData,
      { headers },
    ).pipe(
      parseResponse(RecipeDetailResponseSchema),
    );
  }

}
