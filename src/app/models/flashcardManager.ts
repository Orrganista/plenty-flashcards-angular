import { Flashcard } from '../flashcards/flashcard/flashcard';

export class FlashcardManager {
  private _flashcard: Flashcard;

  constructor(
    private _isActive: boolean,
    private _adding: boolean,
    private _boxId: string,
    private _deckId: string
  ) {
    this._flashcard = new Flashcard(null, '', '');
  }

  public get isActive() {
    return this._isActive;
  }

  public set isActive(value: boolean) {
    this._isActive = value;
  }

  public get adding() {
    return this._adding;
  }

  public set adding(value: boolean) {
    this._adding = value;
  }

  public get boxId() {
    return this._boxId;
  }

  public set boxId(value: string) {
    this._boxId = value;
  }

  public get deckId() {
    return this._deckId;
  }

  public set deckId(value: string) {
    this._deckId = value;
  }

  public get flashcard() {
    return this._flashcard;
  }

  public set flashcard(value: Flashcard) {
    this._flashcard = value;
  }
}
