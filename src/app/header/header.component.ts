import { Component } from '@angular/core';
import { FakeAuthService } from '../fake-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showHiddenContent = false;

  constructor(private authService: FakeAuthService) {}

  checkLogIn(): string[] {
    return this.authService.checkLogIn();
  }
}
