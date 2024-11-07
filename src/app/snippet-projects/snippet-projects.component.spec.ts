import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetProjectsComponent } from './snippet-projects.component';

describe('SnippetProjectsComponent', () => {
  let component: SnippetProjectsComponent;
  let fixture: ComponentFixture<SnippetProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnippetProjectsComponent]
    });
    fixture = TestBed.createComponent(SnippetProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
