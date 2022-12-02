export class SessionFlashcard {
  constructor(
    private _question: string,
    private _answer: string,
    private _isGood: boolean = false
  ) {}

  get question() {
    return this._question;
  }

  get answer() {
    return this._answer;
  }

  get isGood() {
    return this._isGood;
  }

  ok(): void {
    this._isGood = true;
  }
}
