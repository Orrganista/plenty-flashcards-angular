import { Deck } from '../deck/deck';

export class Box {
  constructor(
    public _id: string | null,
    public name: string,
    public decks: Array<Deck>
  ) {}
}
