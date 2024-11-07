import {
  Component,
  EventEmitter,
  HostListener,
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

  showOptions(event: MouseEvent): void {
    const body = document.querySelector('body'); // костыль для закрытия других меню
    body?.click();
    event.stopPropagation();
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

  closeOptions() {
    this.confirmation = false;
  }

  updateTask() {
    console.log(this.task);
    this.taskService.updateTask(this.task).subscribe((result: boolean) => {
      if (result) {
        this.taskChanged.emit();
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.confirmation && !this.isClickInsideOptions(event)) {
      this.closeOptions();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeOptions();
    }
  }

  isClickInsideOptions(event: MouseEvent): boolean {
    const optionsElement = document.querySelector('.delete_confirmation');
    // использую !! для преобразования результата в логический тип.
    // Это гарантирует, что функция всегда вернет true или false, но не null.
    return !!optionsElement && optionsElement.contains(event.target as Node);
  }
}
