import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTechComponent } from './about-tech.component';

describe('AboutTechComponent', () => {
  let component: AboutTechComponent;
  let fixture: ComponentFixture<AboutTechComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutTechComponent]
    });
    fixture = TestBed.createComponent(AboutTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
