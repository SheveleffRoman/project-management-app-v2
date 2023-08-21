// fake-auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FakeAuthService {
  private isAuthenticated = false;

  login(username: string, password: string): boolean {
    // Здесь вы можете сравнивать данные с какими-то предопределенными значениями
    if (username === 'roman' && password === 'Romanik16)') {
      this.isAuthenticated = true;
      // localStorage.setItem('isAuth', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // isLoggedIn(): boolean {
  //   let isAuth = localStorage.getItem('isAuth');
  //   if (isAuth === 'true') {
  //     return true;
  //   }
  //     return false;
  // }
}
