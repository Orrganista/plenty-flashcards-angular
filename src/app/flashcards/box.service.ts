import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Box } from './box';

@Injectable({
  providedIn: 'root',
})
export class BoxService {
  private flashcardsUrl = 'api/flashcards.json';
  constructor(private http: HttpClient) {}

  getBoxes(): Observable<Box[]> {
    return this.http.get<Box[]>(this.flashcardsUrl).pipe(
      tap((data) => console.log('Fetched boxes', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
