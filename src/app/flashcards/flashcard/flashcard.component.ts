import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Flashcard } from './flashcard';

@Component({
  selector: 'fml-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css', '../flashcards-list.component.css'],
})
export class FlashcardComponent implements OnInit {
  @Input() flashcard!: Flashcard;
  @Input('box-id') boxId: string = '0';
  @Input('deck-id') deckId: string = '0';
  @Output() removed = new EventEmitter<string>();

  constructor(private dataService: DataService) {}

  edit(): void {
    this.dataService.flashcardManager.isActive = true;
    this.dataService.flashcardManager.adding = false;
    this.dataService.flashcardManager.boxId = this.boxId;
    this.dataService.flashcardManager.deckId = this.deckId;
    this.dataService.flashcardManager.flashcard = this.flashcard;
  }

  remove(): void {
    this.dataService
      .deleteFlashcard(this.boxId, this.deckId, this.flashcard._id!)
      .subscribe({
        complete: () => this.removed.emit(this.flashcard._id!),
      });
  }

  ngOnInit(): void {}
}
