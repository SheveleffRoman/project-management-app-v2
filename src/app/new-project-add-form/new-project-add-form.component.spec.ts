import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectAddFormComponent } from './new-project-add-form.component';

describe('NewProjectAddFormComponent', () => {
  let component: NewProjectAddFormComponent;
  let fixture: ComponentFixture<NewProjectAddFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewProjectAddFormComponent]
    });
    fixture = TestBed.createComponent(NewProjectAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
