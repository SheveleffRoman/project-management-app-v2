import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTaskComponent } from './board-task.component';

describe('BoardTaskComponent', () => {
  let component: BoardTaskComponent;
  let fixture: ComponentFixture<BoardTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardTaskComponent]
    });
    fixture = TestBed.createComponent(BoardTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
