import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { User } from '../user/user';

const passwordMatcher: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');

  if (password?.pristine || confirm?.pristine) return null;

  return password?.value === confirm?.value ? null : { match: true }; // true dodaje do błędów
};

@Component({
  selector: 'fml-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  user = new User();
  emailMessage: string = '';

  constructor(private fb: FormBuilder) {}

  private validationMessages: any = {
    required: 'Email is required',
    email: 'Email is invalid',
  };

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      nickname: ['', Validators.required],
      email: ['', Validators.required],
      passwordGroup: this.fb.group(
        {
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
        },
        { validators: passwordMatcher }
      ),
    });

    const emailControl = this.registrationForm.get('email');
    emailControl?.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => this.setMessage(emailControl));
  }

  register() {
    console.log(this.registrationForm);
    console.log('Registered: ' + JSON.stringify(this.registrationForm.value));
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';

    // if ((c.touched || c.dirty) && c.errors) {
    if (c.errors) {
      this.emailMessage = Object.keys(c.errors)
        .map((key) => this.validationMessages[key])
        .join(' ');
    }
  }
}
