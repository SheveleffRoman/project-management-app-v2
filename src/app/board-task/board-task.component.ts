import { Component, Inject, Input, OnInit } from '@angular/core';
import { Projects, Task, TaskService } from '../task.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TaskChangeDialogComponent, taskChangeData } from '../task-change-dialog/task-change-dialog.component';



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

  constructor (private taskService: TaskService, public dialog: MatDialog) {}
  

  showOptions() {
    this.confirmation = true;
  }

  deleteTask(id: number, taskName: string) {
    console.log(this.projectName)
    this.taskService.deleteTask(this.projectName, this.boardName, id, taskName);
  }

  declineOptions() {
    this.confirmation = false;
  }

  updateTask() {
    this.taskService.updateTask(this.projectName, this.boardName, this.task.id, this.task)
  }
}
