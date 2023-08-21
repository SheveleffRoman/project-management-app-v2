// auth.directive.ts
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FakeAuthService } from './fake-auth.service';

@Directive({
  selector: '[appAuth]',
})
export class AuthDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: FakeAuthService
  ) {}

  @Input() set appAuth(condition: boolean) {
    if (condition === this.authService.isLoggedIn()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
