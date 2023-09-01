import { Component, Input } from '@angular/core';
import { Task, TaskService } from '../task.service';



@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
})
export class BoardTaskComponent {

  selectedPriority: string = 'low';
  confirmation = false;

  @Input() task!: Task;
  @Input() index!: number;

  constructor (private taskService: TaskService) {}

  showOptions() {
    this.confirmation = true;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  declineOptions() {
    this.confirmation = false;
  }
}
