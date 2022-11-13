import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Box } from './box';
import { FlashcardService } from './flashcard.service';

@Component({
  selector: 'fml-flashcard-list',
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.css'],
})
export class FlashcardListComponent implements OnInit, OnDestroy {
  boxes: Box[] = [];
  errorMessage: string = '';
  sub!: Subscription;

  add: boolean = false;

  constructor(private flashcardService: FlashcardService) {}

  ngOnInit(): void {
    this.sub = this.flashcardService.getBoxes().subscribe({
      next: (boxes) => (this.boxes = boxes),
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  dodaj(): void {
    this.boxes.push({ boxId: 5, name: 'Nowy', decks: [] });
    this.add = true;
  }
}
