import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, HTTP_OPTIONS } from '@app/_services/constante';
import { Observable } from 'rxjs';
import { RoleResponse, RoleResponseSchema } from '@interfaces/responseInterface/RoleResponse';
import { parseResponse } from '@app/_services/parseResponse';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {
  }

  public getMyRoles() : Observable<RoleResponse[]> {
    return this.http.get<RoleResponse[]>(
      API_URL + '/roles/users',
      HTTP_OPTIONS
    ).pipe(
      parseResponse(RoleResponseSchema),
    )
  }
}
