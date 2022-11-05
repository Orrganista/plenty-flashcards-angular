import { IFlashcard } from './flashcard';

export interface IDeck {
  deckId: number;
  name: string;
  flashcards: Array<IFlashcard>;
}
