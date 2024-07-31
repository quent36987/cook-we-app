import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP_OPTIONS } from '@app/_services/constante';
import { Observable } from 'rxjs';
import { z } from 'zod';
import { CommentResponse, CommentResponseSchema } from '@interfaces/responseInterface/CommentResponse';
import { parseResponse } from '@app/_services/parseResponse';
import { CommentRequest } from '@interfaces/requestInterface/CommentRequest';
import { MessageResponse, MessageResponseSchema } from '@interfaces/responseInterface/MessageResponse';
import { API_URL } from '@app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {
  }

  public getCommentsByRecipeId(recipeId: number): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(
      API_URL + '/comments/recipes/' + recipeId,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(z.array(CommentResponseSchema)),
    );
  }

  public getCommentsByUsername(username: string): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(
      API_URL + '/comments/users/' + username,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(z.array(CommentResponseSchema)),
    );
  }

  public postComment(recipeId: number, comment: CommentRequest): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(
      API_URL + '/comments/recipes/' + recipeId,
      comment,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(CommentResponseSchema),
    );
  }

  public deleteComment(commentId: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(
      API_URL + '/comments/' + commentId,
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(MessageResponseSchema),
    );
  }

  public putComment(commentId: number, comment: CommentRequest): Observable<CommentResponse> {
    return this.http.put<CommentResponse>(
      API_URL + '/comments/' + commentId,
      { comment },
      HTTP_OPTIONS,
    ).pipe(
      parseResponse(CommentResponseSchema),
    );
  }
}
