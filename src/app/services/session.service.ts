import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SessionFlashcard } from '../session/sessionFlashcard';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private _session = new Array<SessionFlashcard>();

  constructor() {}

  getSession(): Array<SessionFlashcard> {
    return this._session;
  }

  setSession(session: Array<SessionFlashcard>) {
    this._session = session;
  }
}
