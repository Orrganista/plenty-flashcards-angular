import { Deck } from './deck';

export interface Box {
  boxId: number;
  name: string;
  decks: Array<Deck>;
}
