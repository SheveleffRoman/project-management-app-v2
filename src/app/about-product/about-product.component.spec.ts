import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutProductComponent } from './about-product.component';

describe('AboutProductComponent', () => {
  let component: AboutProductComponent;
  let fixture: ComponentFixture<AboutProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutProductComponent]
    });
    fixture = TestBed.createComponent(AboutProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
