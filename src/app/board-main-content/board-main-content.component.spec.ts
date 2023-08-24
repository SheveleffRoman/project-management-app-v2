import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardMainContentComponent } from './board-main-content.component';

describe('BoardMainContentComponent', () => {
  let component: BoardMainContentComponent;
  let fixture: ComponentFixture<BoardMainContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardMainContentComponent]
    });
    fixture = TestBed.createComponent(BoardMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
