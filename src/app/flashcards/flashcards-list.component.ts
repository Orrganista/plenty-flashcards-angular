import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Box } from './box/box';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { BoxId } from '../models/boxId';

@Component({
  selector: 'fml-flashcards-list',
  templateUrl: './flashcards-list.component.html',
  styleUrls: ['./flashcards-list.component.css'],
})
export class FlashcardsListComponent implements OnInit, OnDestroy {
  addingForm!: FormGroup;
  newBox!: FormControl;
  boxes: Array<Box> = [];
  sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private _dataService: DataService,
    private userService: UserService
  ) {}

  get dataService() {
    return this._dataService;
  }

  ngOnInit(): void {
    this.newBox = new FormControl({ value: '+ Add Box', disabled: true });

    this.dataService.boxesChanges$.subscribe((boxes) => (this.boxes = boxes));
    this.dataService.loadBoxes();
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  addBox(): void {
    this.newBox.setValue('New');
    this.newBox.enable();
  }

  removeBox(boxId: string) {
    const i = this.boxes.findIndex((b) => b._id === boxId);
    this.boxes.splice(i, 1);
  }

  save(): void {
    const box = new Box(null, this.newBox.value, []);

    this.dataService.createBox(box).subscribe({
      next: (data) => {
        box._id = data.insertedId;
        if (this.userService.getLoggedUser()) {
          this.userService.addBox(data.insertedId).subscribe();
        }
      },
      error: (err) => console.log(err),
      complete: () => {
        this.boxes.push(box);
        this.cancel();
      },
    });
  }

  cancel(): void {
    this.newBox.setValue('+ Add Box');
    this.newBox.disable();
  }
}
