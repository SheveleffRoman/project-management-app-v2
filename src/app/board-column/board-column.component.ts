import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import {
  Board,
  BoardX,
  Projects,
  SetBoardsTasks,
  Task,
  TaskService,
  TaskX,
} from '../task.service';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent implements OnInit {
  newTaskName: string = '';
  newTaskDescription: string = '';
  showForm: boolean = false;

  @Input() board!: BoardX;
  @Input() boards: BoardX[] = [];
  @Input() boardName = '';
  @Input() projectName: string = '';
  @Input() projectId: string = '';
  @Input() boardId: string = '';
  @Input() userId: string = '';

  @Output() boardDeleted = new EventEmitter<string>(); // Определение события

  tasks: TaskX[] = [];

  newBoardName: string = '';

  isHidden: boolean = false;
  showRenameBoardForm: boolean = false;

  constructor(private taskService: TaskService) {}


  ngOnInit(): void {
    this.getTasksByBoard();
    // this.getTasksByProject()
  }

  showAddForm() {
    this.showForm = true;
    this.newTaskName = ''; // Сброс полей ввода
    this.newTaskDescription = '';
  }

  closeAddForm() {
    this.showForm = false;
    this.newTaskName = ''; // Сброс полей ввода
    this.newTaskDescription = '';
  }

  getTasksByBoard() {
    this.taskService
      .getTasks(this.projectId, this.boardId)
      .subscribe((tasks) => {
        // console.log(tasks);
        if (tasks && tasks.length > 0) {
          // Сортировка тасков по порядку (tasks.order)
          this.tasks = tasks.sort(this.compareTasksByOrder);
        }
      });
  }

  compareTasksByOrder(a: TaskX, b: TaskX) {
    return a.order - b.order;
  }

  dropTask(event: CdkDragDrop<TaskX[]>) {
    if (event.previousContainer === event.container) {
      // console.log(this.tasks);
      // console.log(event.container.id);
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // console.log(this.tasks);
      console.log(event.container.id);
    }
  }

  // getTasksByProject() {
  //   this.taskService.getTasksByProject(this.projectId).subscribe(
  //     (tasks) => {
  //       this.tasksSet = tasks
  //       console.log(this.tasksSet)
  //     }
  //   )

  // }

  addNewTask() {
    if (this.newTaskName && this.newTaskDescription) {
      const taskData: TaskX = {
        title: this.newTaskName,
        order: this.tasks.length,
        description: this.newTaskDescription,
        userId: this.userId,
        users: [''],
      };

      this.taskService
        .addTask(this.projectId, this.board._id!, taskData)
        .subscribe((res) => {
          console.log(res);
          // После успешного добавления задачи, вызываем getTasksByBoard()
          // чтобы обновить данные и отрисовать актуальные данные.
          this.getTasksByBoard();

          // Скрыть форму после добавления
          this.showForm = false;

          // Сброс полей ввода
          this.newTaskName = '';
          this.newTaskDescription = '';
        });
    }
  }

  onDeleteTask(task: TaskX) {
    // Здесь вы можете выполнить необходимые действия при удалении задачи
    // Например, удалить задачу из массива this.tasks
    this.tasks = this.tasks.filter((t) => t._id !== task._id);
  }

  onUpdateTask() {
    this.getTasksByBoard();
  }

  showBoardRenameForm() {
    this.showRenameBoardForm = true;
    this.newBoardName = this.boardName;
    this.isHidden = true;
  }

  abortRenameBoard() {
    this.showRenameBoardForm = false;
    this.isHidden = false;
  }

  clearInput() {
    this.newBoardName = '';
  }

  renameBoard() {
    if (this.newBoardName) {
      const columnData: BoardX = {
        title: this.newBoardName,
        order: this.board.order,
      };

      this.taskService
        .updateBoardName(this.projectId, this.boardId, columnData)
        .subscribe({
          next: (response) => {
            // Обработка успешного ответа от сервера
            console.log('Доска успешно переименована', response);
            this.board.title = this.newBoardName;
            this.newBoardName = ''; // Сброс поля ввода
            this.isHidden = false;
            console.log(this.board);
          },
          error: (error) => {
            // Обработка ошибки
            console.error('Ошибка при переименовании доски', error);
          },
        });
    }
  }

  deleteBoard(boardName: string) {
    this.taskService
      .deleteBoard(this.projectId, this.board._id!, boardName)
      .subscribe(() => {
        // Удалите доску из массива boards
        this.boards = this.boards.filter(
          (board) => board._id !== this.board._id
        );
        console.log(this.boards);

        // Генерируем событие для оповещения родительского компонента и прокидываем id доски
        this.boardDeleted.emit(this.board._id);
      });
  }

  private generateNewId(): number {
    // Генерирует новый уникальный ID
    // Например, можно использовать временную метку
    return Date.now();
  }
}
