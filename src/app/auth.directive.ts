// auth.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FakeAuthService } from './fake-auth.service';
import { Router } from '@angular/router';

@Directive({
  selector: '[appAuth]',
})
export class AuthDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: FakeAuthService,
    private router: Router
  ) {}

  @Input() set appAuth(condition: boolean) {
    if (condition === this.authService.isLoggedIn()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
      this.router.navigate(['/welcome']);  // тут можно сделать редирект на компонент который покажет, что нет логина
    }
  }
}
