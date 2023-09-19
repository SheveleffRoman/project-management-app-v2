import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeAuthService } from '../fake-auth.service';
import { catchError } from 'rxjs/operators';

export interface User {
  readonly _id: string;
  name: string;
  login: string;
  password: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpSection = new FormGroup({
    name: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  loginFieldTouched = false;

  isLoading = false;
  buttonText = 'Sign in';

  constructor(private router: Router, private authService: FakeAuthService) {}

  ngOnInit(): void {
    this.signUpSection.valueChanges.subscribe((value) => console.log(value));
    this.signUpSection.statusChanges.subscribe((value) => console.log(value));
  }

  checkLoginValidity() {
    this.loginFieldTouched = true;
  }

  onSubmit() {
    this.isLoading = true; // Показать индикатор загрузки
    this.buttonText = 'Loading...';

    this.authService.signUp(this.signUpSection.controls.name.value!, this.signUpSection.controls.login.value!, this.signUpSection.controls.password.value!)
    .pipe(
      catchError((error) => {
        console.error('Ошибка при регистрации:', error);
        this.isLoading = false;
        this.buttonText = 'Sign in';
        throw error;
      })
    )
    .subscribe((response) => {
      console.log('Регистрация прошла успешно:', response);
      this.isLoading = false; // Скрыть индикатор загрузки
      this.buttonText = 'Sign in';
      this.router.navigate(['welcome/login']);
      // Дополнительные действия после успешного запроса
    });
  }
}
