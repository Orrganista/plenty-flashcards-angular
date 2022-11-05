import { IDeck } from './deck';

export interface IBox {
  boxId: number;
  name: string;
  decks: Array<IDeck>;
}
