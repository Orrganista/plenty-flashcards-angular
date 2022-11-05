import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Box } from './box';
import { BoxService } from './box.service';

@Component({
  selector: 'fml-flashcard-list',
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.css'],
})
export class FlashcardListComponent implements OnInit, OnDestroy {
  boxes: Box[] = [];
  errorMessage: string = '';
  sub!: Subscription;

  constructor(private boxService: BoxService) {}

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
