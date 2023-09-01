import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from '../task.service';

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent implements OnInit {
  newTaskName: string = '';
  newTaskDescription: string = '';
  showForm: boolean = false;

  tasks!: Task[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
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

  getTasks() {
    this.tasks = this.taskService.getTasks();
  }

  addNewTask() {
    if (this.newTaskName && this.newTaskDescription) {
      this.taskService.addTask({
        id: this.tasks.length + 1,
        name: this.newTaskName,
        description: this.newTaskDescription,
      });

      this.getTasks();

      // Скрыть форму после добавления
      this.showForm = false;

      // Сброс полей ввода
      this.newTaskName = '';
      this.newTaskDescription = '';
    }
  }

  // deleteTask(index: number) {
  //   if (index >= 0 && index < this.todo.length) {
  //     this.todo.splice(index, 1);
  //   }
  // }
}