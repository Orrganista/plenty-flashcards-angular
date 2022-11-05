import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBox } from './box';
import { BoxService } from './box.service';

@Component({
  selector: 'fml-flashcard-list',
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.css'],
})
export class FlashcardListComponent implements OnInit, OnDestroy {
  boxes: IBox[] = [];
  errorMessage: string = '';
  sub!: Subscription;

  constructor(private boxService: BoxService) {}

  showDecks: boolean = false;
  showFlashcards: boolean = false;

  toggleBox(): void {
    this.showDecks = !this.showDecks;
  }

  toggleDeck(): void {
    this.showFlashcards = !this.showFlashcards;
  }

  ngOnInit(): void {
    this.sub = this.boxService.getBoxes().subscribe({
      next: (boxes) => (this.boxes = boxes),
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
