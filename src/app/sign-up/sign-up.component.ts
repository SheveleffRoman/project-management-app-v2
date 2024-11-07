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
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Zа-яА-Я-]+$'),
    ]),
    login: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9-<>()#$.?/*]+$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$'),
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

    if (this.signUpSection.valid) {
      this.authService
        .signUp(
          this.signUpSection.controls.name.value!,
          this.signUpSection.controls.login.value!,
          this.signUpSection.controls.password.value!
        )
        .pipe(
          catchError((error) => {
            console.error('Ошибка при регистрации:', error);
            this.authService.showErrorDialog(
              'Ошибка регистрации',
              'Неправильные учетные данные. Пожалуйста, проверьте ваше имя пользователя и пароль.'
            );
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
    } else {
      this.signUpSection.markAllAsTouched(); // Mark all fields as touched to show errors
      this.isLoading = false; // Скрыть индикатор загрузки
      this.buttonText = 'Sign in';
      // this.authService.showErrorDialog(
      //   'Ошибка регистрации',
      //   'Неправильные учетные данные. Пожалуйста, проверьте ваше имя пользователя и пароль.'
      // );
    }
  }
}
