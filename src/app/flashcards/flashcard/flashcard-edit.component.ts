import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashcardManager } from 'src/app/models/flashcardManager';
import { DataService } from 'src/app/services/data.service';
import { Box } from '../box/box';
import { Deck } from '../deck/deck';
import { Flashcard } from './flashcard';

@Component({
  selector: 'fml-add',
  templateUrl: './flashcard-edit.component.html',
  styleUrls: ['./flashcard-edit.component.css'],
})
export class FlashcardEditComponent implements OnInit {
  @Input() boxes!: Array<Box>;
  addForm!: FormGroup;
  manager: FlashcardManager;
  title: string = 'New Flashcard';

  get flashcards(): FormArray {
    return this.addForm.get('flashcards') as FormArray;
  }

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.manager = this.dataService.flashcardManager;
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      // name: ['', Validators.required],
      flashcards: this.fb.array([this.buildFlashcard()]),
    });

    if (this.manager.adding) this.title = 'New Flashcard';
    else this.title = 'Edit Flashcard';
  }

  addFlashcard(): void {
    this.flashcards.push(this.buildFlashcard());
  }

  buildFlashcard(): FormGroup {
    const q = this.manager.adding ? '' : this.manager.flashcard.question;
    const a = this.manager.adding ? '' : this.manager.flashcard.answer;

    return this.fb.group({
      question: [q, Validators.required],
      answer: [a, Validators.required],
    });
  }

  save(): void {
    const boxId = this.manager.boxId;
    const deckId = this.manager.deckId;

    const deck = this.boxes
      .find((x) => x._id === boxId)
      ?.decks.find((x) => x._id === deckId);

    if (this.manager.adding) {
      this.addForm.value.flashcards.map((f: any) => {
        const flashcard = new Flashcard(null, f.question, f.answer);
        this.dataService.createFlashcard(boxId, deckId, flashcard).subscribe({
          next: (data) => (flashcard._id = data.upsertedId),
          complete: () => {
            deck?.flashcards.push(flashcard);
            this.close();
          },
        });
      });
    } else {
      this.manager.flashcard.question =
        this.addForm.value.flashcards[0].question;
      this.manager.flashcard.answer = this.addForm.value.flashcards[0].answer;
      this.dataService
        .updateFlashcard(boxId, deckId, this.manager.flashcard)
        .subscribe({
          complete: () => this.close(),
        });
    }
  }

  close(): void {
    this.dataService.flashcardManager.isActive = false;
    this.addForm.reset();
  }
}
