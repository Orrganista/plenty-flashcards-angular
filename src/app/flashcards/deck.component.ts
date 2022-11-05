import { Component, Input, OnInit } from '@angular/core';
import { Deck } from './deck';

@Component({
  selector: 'fml-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
})
export class DeckComponent implements OnInit {
  @Input() deck: Deck = { deckId: 0, name: 'Rome', flashcards: [] };
  showFlashcards: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  toggleDeck(): void {
    this.showFlashcards = !this.showFlashcards;
  }
}
