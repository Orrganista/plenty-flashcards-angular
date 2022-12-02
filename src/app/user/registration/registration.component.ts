import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { User } from '../user';

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
export class RegistrationComponent implements OnInit, OnDestroy {
  registrationForm!: FormGroup;
  user!: User;
  emailMessage: string = '';
  sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

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

  register(): void {
    if (this.registrationForm.valid) {
      const email = this.registrationForm.value.email;
      const nickname = this.registrationForm.value.nickname;
      const password = this.registrationForm.value.passwordGroup.password;

      this.user = new User(null, email, nickname, password, []);
      console.log(this.user);

      this.sub = this.userService.createUser(this.user).subscribe({
        next: () => this.onRegisterComplete(),
        error: (err) => console.log(err),
      });
    }
  }

  onRegisterComplete(): void {
    this.registrationForm.reset();
    this.router.navigate(['/login']);
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
