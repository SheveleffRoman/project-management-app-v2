import { Component, OnInit } from '@angular/core';
import { FakeAuthService } from '../fake-auth.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  loggedInUser: string | null = null;

  constructor(private authService: FakeAuthService) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')!);
  }
}
