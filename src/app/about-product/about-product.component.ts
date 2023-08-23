import { Component } from '@angular/core';
import { FakeAuthService } from '../fake-auth.service';

@Component({
  selector: 'app-about-product',
  templateUrl: './about-product.component.html',
  styleUrls: ['./about-product.component.scss'],
})
export class AboutProductComponent {
  constructor(private auth: FakeAuthService) {}

  checkLogIn(): string[] {
    return this.auth.checkLogIn();
  }
}
