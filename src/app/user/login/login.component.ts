import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Login } from '../login';

@Component({
  selector: 'fml-login',
  templateUrl: './login.component.html',
  styleUrls: ['../registration/registration.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  login!: Login;
  errorMessage = '';
  sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      nickname: ['', Validators.required],
      email: [''],
      password: ['', Validators.required],
      loginMethod: 'nickname',
    });

    this.loginForm
      .get('loginMethod')
      ?.valueChanges.subscribe((value) => this.setLoginMethod(value));
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  tryLogin(): void {
    const l = { ...this.login, ...this.loginForm.value };
    this.userService.loginUser(l);
    this.errorMessage = 'Incorrect login';

    this.sub = this.userService.loggedUserChanges$.subscribe((user) => {
      if (user) {
        this.onLoginComplete();
      } else {
        this.loginForm.get('password')?.reset();
      }
    });
  }

  onLoginComplete(): void {
    this.router.navigate(['/flashcards']);
  }

  setLoginMethod(loginVia: string): void {
    const nickname = this.loginForm.get('nickname');
    const email = this.loginForm.get('email');

    if (loginVia === 'nickname') {
      email?.clearValidators();
      nickname?.setValidators(Validators.required);
    } else if (loginVia === 'email') {
      nickname?.clearValidators();
      email?.setValidators(Validators.required);
    }
    nickname?.updateValueAndValidity();
    email?.updateValueAndValidity();
  }
}
