import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'fml-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  joinForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.joinForm = new FormGroup({
      email: new FormControl(''),
    });
  }

  join() {
    console.log('Joined: ' + JSON.stringify(this.joinForm.get('email')?.value));
    this.joinForm.get('email')?.setValue('');
  }
}
