import { Box } from '../flashcards/box/box';

export class User {
  constructor(
    public _id: string | null,
    public email: string,
    public nickname: string,
    public password: string,
    public boxes: Array<string>
  ) {}

  checkPassword(pass: string): boolean {
    return this.password === pass ? true : false;
  }
}
