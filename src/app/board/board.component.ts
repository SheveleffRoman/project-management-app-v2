import { Component } from '@angular/core';
import { FakeAuthService } from '../fake-auth.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  constructor(private authService: FakeAuthService) {}

  logout() {
    this.authService.logout();
  }

}
