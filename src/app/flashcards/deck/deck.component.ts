import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FlashcardManager } from 'src/app/models/flashcardManager';
import { DataService } from 'src/app/services/data.service';
import { Deck } from './deck';

@Component({
  selector: 'fml-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css', '../flashcards-list.component.css'],
})
export class DeckComponent implements OnInit {
  @Input() deck!: Deck;
  @Input('box-id') boxId: string = '0';
  @Output() removed = new EventEmitter<string>();
  editDeck!: FormControl;
  showFlashcards: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.editDeck = new FormControl({ value: this.deck.name, disabled: true });
  }

  toggleDeck(): void {
    if (this.editDeck.disabled) this.showFlashcards = !this.showFlashcards;
  }

  save(): void {
    this.deck.name = this.editDeck.value;
    this.dataService.updateDeck(this.boxId, this.deck).subscribe({
      complete: () => this.cancel(),
    });
  }

  remove(): void {
    this.dataService.deleteDeck(this.boxId, this.deck._id!).subscribe({
      complete: () => this.removed.emit(this.deck._id!),
    });
  }

  addFlashcard(): void {
    this.dataService.flashcardManager.isActive = true;
    this.dataService.flashcardManager.adding = true;
    this.dataService.flashcardManager.boxId = this.boxId;
    this.dataService.flashcardManager.deckId = this.deck._id!;
  }

  removeFlashcard(flashcardId: string): void {
    const i = this.deck.flashcards.findIndex((f) => f._id === flashcardId);
    this.deck.flashcards.splice(i, 1);
  }

  cancel(): void {
    this.editDeck.setValue(this.deck.name);
    this.editDeck.disable();
  }
}
