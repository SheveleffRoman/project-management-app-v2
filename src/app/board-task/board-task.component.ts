import { Component, Input, OnInit } from '@angular/core';
import { Projects, Task, TaskService } from '../task.service';



@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
})
export class BoardTaskComponent {

  selectedPriority: string = 'low';
  confirmation = false;

  @Input() task!: Task;
  @Input() boardName = '';
  @Input() projectName!: string;

  constructor (private taskService: TaskService) {}
  

  showOptions() {
    this.confirmation = true;
  }

  deleteTask(id: number) {
    console.log(this.projectName)
    this.taskService.deleteTask(this.projectName, this.boardName, id);
  }

  declineOptions() {
    this.confirmation = false;
  }
}
