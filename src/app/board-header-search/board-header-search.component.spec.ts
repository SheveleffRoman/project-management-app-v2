import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardHeaderSearchComponent } from './board-header-search.component';

describe('BoardHeaderSearchComponent', () => {
  let component: BoardHeaderSearchComponent;
  let fixture: ComponentFixture<BoardHeaderSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardHeaderSearchComponent]
    });
    fixture = TestBed.createComponent(BoardHeaderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
