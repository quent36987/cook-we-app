import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@app/environments/environment';
import { HTTP_OPTIONS } from '@app/_services/constante';
import { ShoppingListResponse, ShoppingListResponseSchema } from '@interfaces/responseInterface/ShoppingListResponse';
import { ShoppingListDetailResponse, ShoppingListDetailResponseSchema } from '@interfaces/responseInterface/ShoppingListDetailResponse';
import { parseResponse } from '@app/_services/parseResponse';
import { z } from 'zod';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private http: HttpClient) {}

  public getUserShoppingLists(): Observable<ShoppingListResponse[]> {
    return this.http.get<ShoppingListResponse[]>(
      API_URL + '/shopping-list',
      HTTP_OPTIONS
    ).pipe(
      parseResponse(z.array(ShoppingListResponseSchema)),
    );
  }

  public getShoppingListById(shoppingListId: number): Observable<ShoppingListDetailResponse> {
    return this.http.get<ShoppingListDetailResponse>(
      `${API_URL}/shopping-list/${shoppingListId}`,
      HTTP_OPTIONS
    ).pipe(
      parseResponse(ShoppingListDetailResponseSchema),
    );
  }

  public createShoppingList(name: string): Observable<ShoppingListResponse> {
    return this.http.post<ShoppingListResponse>(
      API_URL + '/shopping-list',
      { name },
      HTTP_OPTIONS
    ).pipe(
      parseResponse(ShoppingListResponseSchema),
    );
  }

  public deleteShoppingList(shoppingListId: number): Observable<void> {
    return this.http.delete<void>(
      `${API_URL}/shopping-list/${shoppingListId}`,
      HTTP_OPTIONS
    );
  }
}
