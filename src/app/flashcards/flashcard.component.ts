import { Component, Input, OnInit } from '@angular/core';
import { Flashcard } from './flashcard';

@Component({
  selector: 'fml-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css'],
})
export class FlashcardComponent implements OnInit {
  @Input() flashcard: Flashcard = {
    flashcardId: 0,
    question: 'Umów trzeba dotrzymywać',
    answer: 'Pacta sunt servanda',
  };

  constructor() {}

  ngOnInit(): void {}
}
