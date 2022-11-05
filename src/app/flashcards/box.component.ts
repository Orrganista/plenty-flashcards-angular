import { Component, Input, OnInit } from '@angular/core';
import { Box } from './box';

@Component({
  selector: 'fml-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css'],
})
export class BoxComponent implements OnInit {
  @Input() box: Box = { boxId: 0, name: 'Ancient Times', decks: [] };
  showDecks: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleBox(): void {
    this.showDecks = !this.showDecks;
  }
}
