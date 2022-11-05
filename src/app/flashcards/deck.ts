import { Flashcard } from './flashcard';

export interface Deck {
  deckId: number;
  name: string;
  flashcards: Array<Flashcard>;
}
