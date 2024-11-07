import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSideMenuComponent } from './board-side-menu.component';

describe('BoardSideMenuComponent', () => {
  let component: BoardSideMenuComponent;
  let fixture: ComponentFixture<BoardSideMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardSideMenuComponent]
    });
    fixture = TestBed.createComponent(BoardSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
