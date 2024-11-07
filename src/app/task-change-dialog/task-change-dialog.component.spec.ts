import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskChangeDialogComponent } from './task-change-dialog.component';

describe('TaskChangeDialogComponent', () => {
  let component: TaskChangeDialogComponent;
  let fixture: ComponentFixture<TaskChangeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskChangeDialogComponent]
    });
    fixture = TestBed.createComponent(TaskChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
