import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Box } from '../flashcards/box/box';
import { Deck } from '../flashcards/deck/deck';
import { DataService } from '../services/data.service';
import { SessionService } from '../services/session.service';
import { SessionFlashcard } from './sessionFlashcard';

@Component({
  selector: 'fml-session-choice',
  templateUrl: './session-choice.component.html',
  styleUrls: ['./session-choice.component.css'],
})
export class SessionChoiceComponent implements OnInit {
  boxes: Array<Box> = [];
  chosenBox: Box | null = null;
  chosenDeck: Deck | null = null;
  amount: Array<string> = ['5', '10', '20', 'All'];

  constructor(
    private dataService: DataService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataService.boxesChanges$.subscribe((boxes) => (this.boxes = boxes));
    this.dataService.loadBoxes();
  }

  chooseBox(box: Box): void {
    this.chosenDeck = null;
    this.chosenBox = box;
  }

  chooseDeck(deck: Deck): void {
    this.chosenDeck = deck;
  }

  start(): void {
    if (this.chosenDeck?.flashcards.length) {
      const session: Array<SessionFlashcard> = [];
      this.chosenDeck?.flashcards.map((x) => {
        const f: SessionFlashcard = new SessionFlashcard(x.question, x.answer);
        session.push(f);
      });
      this.sessionService.setSession(session);
      this.router.navigate(['/session', this.chosenDeck._id]);
    }
  }
}
