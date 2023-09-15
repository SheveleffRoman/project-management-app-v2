// fake-auth.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  ErrorDialogData,
  WarningDialogComponent,
} from './warning-dialog/warning-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class FakeAuthService {
  private isAuthenticated = false;

  private loggedInUser: string | null = null;

  constructor(private router: Router, public dialog: MatDialog) {}

  showErrorDialog(title: string, message: string, button: string = 'Закрыть', callback?: () => void) {
    const errorDialogData: ErrorDialogData = { title, message, button };
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      width: '400px',
      data: errorDialogData,
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('Модальное окно закрыто');
      if (callback) {
        callback(); // Вызываем колбэк-функцию только после закрытия окна
      }
    });
  }

  login(username: string, password: string): boolean {
    // Здесь вы можете сравнивать данные с какими-то предопределенными значениями
    if (username === 'roman' && password === 'Romanik16)') {
      this.isAuthenticated = true;
      localStorage.setItem('isAuth', 'true');
      return true;
    } else {
      // Показать универсальное модальное окно с предупреждением об ошибке
      this.showErrorDialog(
        'Ошибка входа',
        'Неправильные учетные данные. Пожалуйста, проверьте ваше имя пользователя и пароль.'
      );
      return false;
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.setItem('isAuth', 'false');
    localStorage.removeItem('loggedInUser');
    this.showErrorDialog(
      'Вы вышли из аккаунта',
      'После нажатия на кнопку вы будете перенаправлены на главную страницу',
      'Перейти на главную',
      () => {
        // Колбэк-функция будет вызвана после закрытия диалога
        this.router.navigate(['/welcome']);
      }
    );
    // setTimeout(() => {
    //   this.dialog.closeAll();
    //   this.router.navigate(['/welcome']);
    // }, 2500);
  }

  // isLoggedIn(): boolean {
  //   return this.isAuthenticated;
  // }

  isLoggedIn(): boolean {
    let isAuth = localStorage.getItem('isAuth');
    if (isAuth === 'true') {
      return true;
    }
    return false;
  }

  checkLogIn(): string[] {
    let isAuth = localStorage.getItem('isAuth');
    if (isAuth === 'true') {
      return ['/projects'];
    }
    return ['/welcome/login'];
  }

  setLoggedInUser(username: string): void {
    this.loggedInUser = username;
  }

  getLoggedInUser(): string | null {
    return this.loggedInUser;
  }
}
