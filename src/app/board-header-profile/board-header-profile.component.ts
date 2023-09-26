import { Component, OnInit } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ProfileChangeDialogComponent } from '../profile-change-dialog/profile-change-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FakeAuthService } from '../fake-auth.service';

@Component({
  selector: 'app-board-header-profile',
  templateUrl: './board-header-profile.component.html',
  styleUrls: ['./board-header-profile.component.scss'],
})
export class BoardHeaderProfileComponent implements OnInit {
  constructor(public dialog: MatDialog, private authService: FakeAuthService) {}

  name: string | null = '';
  // location?: string = 'Tbilisi, Georgia';
  login: string | null = '';
  password: string | null = '';
  userId: string | null = '';

  options: boolean = false;

  ngOnInit(): void {
    this.getLogin();
    this.findUser();
    // console.log(this.userId)
  }

  findUser(): void {
    this.authService.getUserAll().subscribe(
      (users) => {
        const user = users.find((user: any) => this.login === user.login);
        if (user) {
          this.userId = user._id;
          this.name = user.name;
          this.password = user.password; // тут нет пароля, надо его как-то вытащить

          // Используйте отладочный метод для вывода информации
          this.debugInfo('User found:', user);
        } else {
          // Если пользователь не найден, также выведите информацию
          this.debugInfo('User not found for login:', this.login);
          this.authService.logout();
        }
      },
      (error) => {
        // Обработка ошибок и вывод информации
        this.debugInfo('Error occurred:', error);
      }
    );
  }

  debugInfo(message: string, data: any): void {
    console.log(message, data);
  }

  // findName(): void {
  //   let name = localStorage.getItem('login');
  //   if (name) {
  //     this.name = name;
  //   }
  // }

  getLogin() {
    this.login = this.authService.getLogin();
  }

  showOptions() {
    this.options = true;
  }

  declineOptions() {
    this.options = false;
  }

  showChangeDialog(): Observable<profileData> {
    const profileData: profileData = {
      name: this.name,
      login: this.login,
      password: this.password,
    };
    const dialogRef = this.dialog.open(ProfileChangeDialogComponent, {
      width: '400px',
      data: profileData,
    });
    return dialogRef.afterClosed();
  }

  updateProfile() {
    this.showChangeDialog().subscribe((result) => {
      if (result) {
        console.log(result);
        // this.login = result.login;
        // this.name = result.name;
        this.login = 'Updating profile...';

        this.authService.putUserById(this.userId!, result).subscribe(  // вот тут отправляются все три поля в тч пустой пароль, либо добываем пароль в поле, либо отправляем без него
          (response) => {
            // Обработка успешного ответа от сервера, если это необходимо.
            console.log('Профиль обновлен успешно!', response);

            this.login = result.login;
            this.name = result.name;
            localStorage.setItem('login', this.login!)
            // this.location = result.location;
          },
          (error) => {
            // Обработка ошибки при отправке запроса на сервер.
            console.error('Произошла ошибка при обновлении профиля:', error);
          }
        );
      }
    });
  }

  deleteProfile() {
    this.authService.deleteUserById(this.userId!).subscribe(
      (response) => {
        console.log('Профиль успешно удален!', response);
      },
      (error) => {
        console.error('Произошла ошибка при удалении профиля:', error);
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}

export interface profileData {
  name: string | null;
  login: string | null;
  password: string | null;
}
