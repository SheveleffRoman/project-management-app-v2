import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardHeaderProfileComponent } from './board-header-profile.component';

describe('BoardHeaderProfileComponent', () => {
  let component: BoardHeaderProfileComponent;
  let fixture: ComponentFixture<BoardHeaderProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardHeaderProfileComponent]
    });
    fixture = TestBed.createComponent(BoardHeaderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
