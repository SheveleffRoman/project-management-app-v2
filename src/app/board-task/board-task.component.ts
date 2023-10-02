import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Projects, Task, TaskService, TaskX } from '../task.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {
  TaskChangeDialogComponent,
  taskChangeData,
} from '../task-change-dialog/task-change-dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
})
export class BoardTaskComponent {
  selectedPriority: string = 'low';
  confirmation = false;

  @Output() taskDeleted = new EventEmitter<TaskX>();
  @Output() taskChanged = new EventEmitter<any>();

  @Input() task!: TaskX;
  @Input() boardName = '';
  @Input() projectName!: string;
  @Input() order: number | undefined;

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  showOptions() {
    this.confirmation = true;
  }

  deleteTask() {
    this.taskService
      .deleteTask(
        this.task.boardId!,
        this.task.columnId!,
        this.task._id!,
        this.task.title
      )
      .subscribe((result: boolean) => {
        // Отправляем информацию о задаче в родительский компонент для удаления
        if (result) {
          this.taskDeleted.emit(this.task);
        }
      });
  }

  declineOptions() {
    this.confirmation = false;
  }

  updateTask() {
    console.log(this.task);
    this.taskService.updateTask(this.task).subscribe(
      (result: boolean) => {
        if (result) {
          this.taskChanged.emit()
        }
      }
    );
  }
}
