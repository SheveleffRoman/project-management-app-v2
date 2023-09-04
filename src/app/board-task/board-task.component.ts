import { Component, Input, OnInit } from '@angular/core';
import { Task, TaskObj, TaskService } from '../task.service';



@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
})
export class BoardTaskComponent {

  selectedPriority: string = 'low';
  confirmation = false;

  @Input() task!: TaskObj;
  @Input() boardName = '';

  constructor (private taskService: TaskService) {}
  

  showOptions() {
    this.confirmation = true;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(this.boardName, id);
  }

  declineOptions() {
    this.confirmation = false;
  }
}
