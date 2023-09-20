import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FakeAuthService } from '../fake-auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  logInSection = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$')
    ]),
  });

  loginFieldTouched = false;
  isLoading = false;
  buttonText = 'Log in';

  constructor(private authService: FakeAuthService, private router: Router) {}

  ngOnInit(): void {
    this.logInSection.valueChanges.subscribe((value) => console.log(value));
    this.logInSection.statusChanges.subscribe((value) => console.log(value))
  }

  checkLoginValidity() {
    this.loginFieldTouched = true;
  }

  // login(username: string, password: string): void {
  //     // Обработка успешного входа
  //     if (this.authService.login(username, password)) {
  //       this.authService.setLoggedInUser(username); // Сохранение имени пользователя
  //       localStorage.setItem('loggedInUser', JSON.stringify(username));
  //       this.router.navigate(['projects']);
  //   } else {
  //     // Обработка ошибки входа
  //   }
  // }
  
  // onSubmit() {
  //   if (this.logInSection.valid) {
  //     // Handle form submission
  //     this.login(this.logInSection.controls.login.value!, this.logInSection.controls.password.value!)
    // } else {
    //   this.logInSection.markAllAsTouched(); // Mark all fields as touched to show errors
    // }
  // }


  onSubmit() {
    this.isLoading = true; // Показать индикатор загрузки
    this.buttonText = 'Loading...';

    if (this.logInSection.valid) {
      this.authService.login(this.logInSection.controls.login.value!, this.logInSection.controls.password.value!).pipe(
        catchError((error) => {
          console.error('Ошибка при входе:', error);
          this.isLoading = false; // Скрыть индикатор загрузки
          this.buttonText = 'Log in';
          this.authService.showErrorDialog('Ошибка входа',
          'Неправильные учетные данные. Пожалуйста, проверьте ваше имя пользователя и пароль.')
          throw error;
        })
      ).subscribe((response) => {
        console.log('Вход прошел успешно:', response);
        this.isLoading = false; // Скрыть индикатор загрузки
        this.buttonText = 'Log in';
        this.authService.saveToken(this.logInSection.controls.login.value!, response.token);
        this.authService.setLoggedInUser(this.logInSection.controls.login.value!); // Сохранение имени пользователя
        localStorage.setItem('loggedInUser', JSON.stringify(this.logInSection.controls.login.value!));
        localStorage.setItem('isAuth', 'true');
        this.router.navigate(['projects']);
        // Дополнительные действия после успешного запроса
      });
    } else {
      this.logInSection.markAllAsTouched(); // Mark all fields as touched to show errors
      this.isLoading = false; // Скрыть индикатор загрузки
      this.buttonText = 'Log in';
    }
    

  }
}
