import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  of,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { Box } from '../flashcards/box/box';
import { Deck } from '../flashcards/deck/deck';
import { Flashcard } from '../flashcards/flashcard/flashcard';
import { FlashcardManager } from '../models/flashcardManager';
import { Inserted } from '../models/inserted';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // private baseUrl = 'api/flashcards.json';
  private baseUrl = 'http://localhost:4000/api/boxes';
  flashcardManager: FlashcardManager;

  private _boxes = new Subject<Array<Box>>();
  boxesChanges$ = this._boxes.asObservable();
  private boxes: Array<Box> = [];

  changeBoxes(boxes: Box[]): void {
    this._boxes.next(boxes);
  }

  constructor(private http: HttpClient, private userService: UserService) {
    this.flashcardManager = new FlashcardManager(false, true, '', '');
  }

  loadBoxes() {
    if (this.userService.getLoggedUser()) {
      this.userService.getLoggedUser().boxes.map((id) => {
        this.getBoxById(id).subscribe({
          next: (box) => {
            if (box) {
              this.boxes.push(box);
            } else {
              this.userService.deleteBox(id).subscribe();
            }
          },
          error: (err) => console.log(err),
          complete: () => {
            this.changeBoxes(this.boxes);
            this.boxes = [];
          },
        });
      });
    } else {
      this.getBoxes().subscribe({
        next: (boxes) => this.changeBoxes(boxes),
        error: (err) => console.log(err),
        complete: () => console.log('All boxes received'),
      });
    }
  }

  createBox(box: Box): Observable<Inserted> {
    return this.http
      .post<Inserted>(this.baseUrl, box, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((data) =>
          console.log('Created Box:', JSON.stringify(data.insertedId))
        ), // nie zmienia obserwowanych wartości
        catchError(this.handleError)
      );
  }

  getBoxes(): Observable<Box[]> {
    return this.http.get<Box[]>(this.baseUrl).pipe(
      tap((data) => console.log('Received Boxes: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getBoxById(id: string): Observable<Box> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Box>(url).pipe(
      tap((data) => {
        if (data) console.log('Received Box: ', JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }

  updateBox(box: Box): Observable<void> {
    const url = `${this.baseUrl}/${box._id}`;
    return this.http
      .patch<void>(url, JSON.stringify({ name: box.name, decks: box.decks }), {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap(() => console.log('Updated Box: ', box._id)),
        catchError(this.handleError)
      );
  }

  deleteBox(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => console.log('Deleted Box: ', id)),
      catchError(this.handleError)
    );
  }

  createDeck(boxId: string, deck: Deck): Observable<Inserted> {
    const url = `${this.baseUrl}/${boxId}/decks`;
    return this.http
      .post<Inserted>(url, deck, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((data) =>
          console.log('Created Deck:', JSON.stringify(data.upsertedId))
        ),
        catchError(this.handleError)
      );
  }

  updateDeck(boxId: string, deck: Deck): Observable<void> {
    const url = `${this.baseUrl}/${boxId}/decks/${deck._id}`;
    return this.http
      .patch<void>(url, JSON.stringify({ name: deck.name }), {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap(() => console.log('Updated Deck: ', deck._id)),
        catchError(this.handleError)
      );
  }

  deleteDeck(boxId: string, id: string): Observable<void> {
    const url = `${this.baseUrl}/${boxId}/decks/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => console.log('Deleted Deck: ', id)),
      catchError(this.handleError)
    );
  }

  createFlashcard(
    boxId: string,
    deckId: string,
    flashcard: Flashcard
  ): Observable<Inserted> {
    const url = `${this.baseUrl}/${boxId}/decks/${deckId}/flashcards`;
    return this.http
      .post<Inserted>(url, flashcard, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((data) =>
          console.log('Created Flashcard:', JSON.stringify(data.upsertedId))
        ),
        catchError(this.handleError)
      );
  }

  updateFlashcard(
    boxId: string,
    deckId: string,
    flashcard: Flashcard
  ): Observable<void> {
    const url = `${this.baseUrl}/${boxId}/decks/${deckId}/flashcards/${flashcard._id}`;
    return this.http
      .patch<void>(
        url,
        JSON.stringify({
          question: flashcard.question,
          answer: flashcard.answer,
        }),
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(
        tap(() => console.log('Updated Flashcard: ', flashcard._id)),
        catchError(this.handleError)
      );
  }

  deleteFlashcard(boxId: string, deckId: string, id: string): Observable<void> {
    const url = `${this.baseUrl}/${boxId}/decks/${deckId}/flashcards/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => console.log('Deleted Flashcard: ', id)),
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
