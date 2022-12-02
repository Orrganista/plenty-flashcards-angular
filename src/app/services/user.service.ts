import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { Inserted } from '../models/inserted';
import { Login } from '../user/login';
import { User } from '../user/user';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:4000/api/users';
  private _loggedUser = new Subject<User | null>();
  loggedUserChanges$ = this._loggedUser.asObservable();

  constructor(private http: HttpClient) {}

  changeLoggedUser(user: User | null): void {
    this._loggedUser.next(user);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getLoggedUser(): User {
    const user = window.sessionStorage.getItem(USER_KEY);
    return JSON.parse(user!);
  }

  getUserByQuery(query: string, value: string): Observable<User> {
    const url = `${this.baseUrl}?${query}=${value}`;

    return this.http
      .get<User[]>(url, {
        headers: new HttpHeaders({
          Accept: 'application/json',
          Authorization: 'my-token',
        }),
      })
      .pipe(
        map((u) => {
          return new User(
            u[0]._id,
            u[0].email,
            u[0].nickname,
            u[0].password,
            u[0].boxes
          );
        }),
        catchError(this.handleError)
      );
  }

  loginUser(login: Login) {
    const loginMethod = login.loginMethod as keyof Login;

    this.getUserByQuery(loginMethod, login[loginMethod]).subscribe({
      next: (user) => {
        if (user.checkPassword(login.password)) {
          this.changeLoggedUser(user);
          console.log('Successfully logged in: ' + user.nickname);
        } else {
          this.changeLoggedUser(null);
          console.log('Incorrect data');
        }
      },
      error: (err) => console.log(),
    });
  }

  logout(): void {
    this.changeLoggedUser(null);
    window.sessionStorage.clear();
  }

  createUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.baseUrl, user, { headers: headers }).pipe(
      tap((data) => console.log('Registered user: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addBox(id: string): Observable<Inserted> {
    const boxId = JSON.stringify({ boxId: id });

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/${this.getLoggedUser()._id}/boxes`;

    return this.http.post<Inserted>(url, boxId, { headers: headers }).pipe(
      tap((data) => {
        console.log(
          'Added Box: ' + id + ' to ' + this.getLoggedUser().nickname
        );
        const user = this.getLoggedUser();
        user.boxes.push(id);
        this.changeLoggedUser(user);
      }),
      catchError(this.handleError)
    );
  }

  deleteBox(id: string): Observable<string> {
    const url = `${this.baseUrl}/${this.getLoggedUser()!._id}/boxes/${id}`;
    return this.http.delete<string>(url).pipe(
      tap((data) => {
        console.log(
          'Deleted Box: ' + id + ' from ' + this.getLoggedUser().nickname
        );
        const user = this.getLoggedUser();
        const index = user.boxes.indexOf(id);
        user.boxes.splice(index, 1);
        this.changeLoggedUser(user);
      }),
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
