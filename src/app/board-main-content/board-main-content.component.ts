import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../task.service';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board-main-content',
  templateUrl: './board-main-content.component.html',
  styleUrls: ['./board-main-content.component.scss'],
})
export class BoardMainContentComponent implements OnInit {
  boards!: Task[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards() {
    this.boards = this.taskService.getBoards();
  }

  dropCol(event: CdkDragDrop<Task>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
  }

  dropTasks(event: CdkDragDrop<Task>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data.tasks,
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
