// fake-auth.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  ErrorDialogData,
  WarningDialogComponent,
} from './warning-dialog/warning-dialog.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { profileData } from './board-header-profile/board-header-profile.component';
import { ConfirmationDialogComponent, ConfirmationDialogData } from './confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class FakeAuthService {
  private isAuthenticated = false;

  private apiUrl = 'https://sheveleffroman-final-task-backend.onrender.com';

  private tokenKey: string | null = null;
  public username: string | null = null;
  public userId: string | null = null;
  jwtHelperService = new JwtHelperService();

  private loggedInUser: string | null = null;

  constructor(private router: Router, public dialog: MatDialog, private http: HttpClient) {}

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

  showConfirmationDialog(title: string, message: string): Observable<boolean> {
    const confirmationDialogData: ConfirmationDialogData = {title, message, deleteProfile: true};
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width:'400px',
      data: confirmationDialogData,
    })

    return dialogRef.afterClosed().pipe(
      tap((result) => {
        console.log('Диалоговое окно закрыто, результат:', result);
      })
    );
  }
  

 signUp(name: string, login: string, password: string): Observable<any> {
    // Создайте объект данных для регистрации
    const registrationData = { name, login, password };

    // Отправьте POST-запрос на сервер для регистрации
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, registrationData);
  }

  login (login: string, password: string): Observable<any> {
    const authenticationData = { login, password };
    return this.http.post<any>(`${this.apiUrl}/auth/signin`, authenticationData)
  }

  saveToken(login: string, token: string) {
    localStorage.setItem('login', login);
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('login');
    localStorage.removeItem('token');
  }

  getLogin() {
    return localStorage.getItem('login');
  }

  // isLoggedIn() {
  //   return this.getToken() !== null;
  // }

  authorize() {
    if (!this.jwtHelperService.isTokenExpired(localStorage.getItem('token'))) {
      this.tokenKey = localStorage.getItem('token') as string;
      // this.username = localStorage.getItem('token') as string;
    } else {
      this.router.navigate(['/welcome']);
      this.logout();
    }
  }

  getUserAll(): Observable<any> {
    this.authorize();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });

    const requestOptions = { headers: headers };

    return this.http
      .get<any>(`${this.apiUrl}/users`, requestOptions)
  }

  getUserById(id: string): Observable<any> {
    this.authorize();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });

    const requestOptions = { headers: headers };

    return this.http
      .get<any>(`${this.apiUrl}/users/${id}`, requestOptions)
  }

  putUserById(uderId: string, userData: profileData): Observable<any> {
    this.authorize();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });

    const requestOptions = { headers: headers };

    return this.http
      .put<any>(`${this.apiUrl}/users/${uderId}`, userData, requestOptions)
  }

  deleteUserById(userId: string): Observable<any> {
    this.authorize();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
  
    const requestOptions = { headers: headers };
  
    return this.showConfirmationDialog('Вы точно хотите удалить аккаунт?', 'После нажатия на кнопку все данные будут стёрты и вы будете перенаправлены на главную страницу').pipe(
      switchMap((result: boolean) => {
        if (result) {
          // Если пользователь подтвердил удаление
          this.isAuthenticated = false;
          localStorage.setItem('isAuth', 'false');
          this.removeToken();
          localStorage.removeItem('loggedInUser');
          this.router.navigate(['/welcome']);
          return this.http.delete<any>(`${this.apiUrl}/users/${userId}`, requestOptions);
        } else {
          // If user did not confirm, return an empty observable
          return of(null);
        }
      })
    );
  }
  

  logout(): void {
    this.isAuthenticated = false;
    localStorage.setItem('isAuth', 'false');
    this.removeToken();
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
