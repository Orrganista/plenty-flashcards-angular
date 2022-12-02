import { Pipe, PipeTransform } from '@angular/core';
import { Deck } from '../flashcards/deck/deck';

@Pipe({
  name: 'notEmptyDeck',
})
export class NotEmptyDeckPipe implements PipeTransform {
  transform(decks: Deck[]) {
    return decks.filter((x) => x.flashcards.length > 0);
  }
}
