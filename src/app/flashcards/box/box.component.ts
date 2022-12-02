import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Deck } from '../deck/deck';
import { Box } from './box';

@Component({
  selector: 'fml-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css', '../flashcards-list.component.css'],
})
export class BoxComponent implements OnInit {
  @Input() box!: Box;
  @Input() index!: number;
  @Output() removed = new EventEmitter<string>();
  showDecks: boolean = false;
  editBox!: FormControl;
  newDeck!: FormControl;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.editBox = new FormControl({ value: this.box.name, disabled: true });
    this.newDeck = new FormControl({ value: '+ Add Deck', disabled: true });
  }

  toggleBox(): void {
    if (this.editBox.disabled) this.showDecks = !this.showDecks;
  }

  save(): void {
    this.box.name = this.editBox.value;
    this.dataService.updateBox(this.box).subscribe({
      complete: () => this.cancel(),
    });
  }

  remove(): void {
    this.dataService.deleteBox(this.box._id!).subscribe({
      complete: () => this.removed.emit(this.box._id!),
    });
  }

  addDeck(): void {
    const deck = new Deck(null, this.newDeck.value, []);
    this.dataService.createDeck(this.box._id!, deck).subscribe({
      next: (data) => (deck._id = data.upsertedId),
      complete: () => {
        this.box.decks.push(deck);
        this.cancel();
      },
    });
  }

  removeDeck(deckId: string): void {
    const i = this.box.decks.findIndex((d) => d._id === deckId);
    this.box.decks.splice(i, 1);
  }

  cancel(): void {
    if (this.editBox.enabled) {
      this.editBox.setValue(this.box.name);
      this.editBox.disable();
    }

    if (this.newDeck.enabled) {
      this.newDeck.setValue('+ Add Deck');
      this.newDeck.disable();
    }
  }
}
