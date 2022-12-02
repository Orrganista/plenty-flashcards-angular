import { Flashcard } from '../flashcard/flashcard';

export class Deck {
  constructor(
    public _id: string | null,
    public name: string,
    public flashcards: Array<Flashcard>
  ) {}
}
