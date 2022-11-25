import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fml-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  addForm!: FormGroup;
  objType: string = 'Flashcard';
  flashcarda: boolean = true;

  get flashcards(): FormArray {
    return this.addForm.get('flashcards') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      flashcards: this.fb.array([this.buildFlashcard()]),
    });

    if (this.flashcarda) {
      this.addForm.removeControl('name');
    } else {
      this.addForm.removeControl('flashcards');
    }
  }

  addFlashcard(): void {
    this.flashcards.push(this.buildFlashcard());
  }

  buildFlashcard(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }

  save(): void {
    console.log(this.addForm);
    console.log('Added: ' + JSON.stringify(this.addForm.value));
  }
}
