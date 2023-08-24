import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FakeAuthService } from '../fake-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  logInSection = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$')
    ]),
  });

  loginFieldTouched = false;

  constructor(private authService: FakeAuthService, private router: Router) {}

  ngOnInit(): void {
    this.logInSection.valueChanges.subscribe((value) => console.log(value));
    this.logInSection.statusChanges.subscribe((value) => console.log(value))
  }

  checkLoginValidity() {
    this.loginFieldTouched = true;
  }

  login(username: string, password: string): void {
      // Обработка успешного входа
      if (this.authService.login(username, password)) {
        this.authService.setLoggedInUser(username); // Сохранение имени пользователя
        localStorage.setItem('loggedInUser', JSON.stringify(username));
        this.router.navigate(['board']);
    } else {
      // Обработка ошибки входа
    }
  }
  
  onSubmit() {
    if (this.logInSection.valid) {
      // Handle form submission
      this.login(this.logInSection.controls.login.value!, this.logInSection.controls.password.value!)
    } else {
      this.logInSection.markAllAsTouched(); // Mark all fields as touched to show errors
    }
  }
}
