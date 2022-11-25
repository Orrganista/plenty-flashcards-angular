import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'fml-login',
  templateUrl: './login.component.html',
  styleUrls: ['../registration/registration.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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

  login() {
    console.log(this.loginForm);
    console.log('Logged: ' + JSON.stringify(this.loginForm.value));
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
