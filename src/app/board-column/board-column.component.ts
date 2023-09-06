import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from '../task.service';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent {
  newTaskName: string = '';
  newTaskDescription: string = '';
  showForm: boolean = false;

  @Input() board!: Task;
  @Input() boardName = '';

  tasks!: Task[];

  constructor(private taskService: TaskService) {}

  // ngOnInit(): void {
  //   this.getTasks();
  // }

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

  addNewTask() {
    if (this.newTaskName && this.newTaskDescription) {
      this.taskService.addTask(this.boardName, {
        id: this.generateNewId(),
        name: this.newTaskName,
        description: this.newTaskDescription,
      });

      // Скрыть форму после добавления
      this.showForm = false;

      // Сброс полей ввода
      this.newTaskName = '';
      this.newTaskDescription = '';
    }
  }

  private generateNewId(): number {
    // Генерирует новый уникальный ID
    // Например, можно использовать временную метку
    return Date.now();
  }
}
