import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fml-flashcard-add',
  templateUrl: './flashcard-add.component.html',
  styleUrls: ['./flashcard-add.component.css'],
})
export class FlashcardAddComponent implements OnInit {
  @Input() what: string = '';
  constructor() {}

  ngOnInit(): void {}
}
