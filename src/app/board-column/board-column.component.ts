import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

export interface Task {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})
export class BoardColumnComponent {
  newTaskName: string = '';
  newTaskDescription: string = '';
  showForm: boolean = false;

  todo: Task[] = [
    {
      id: 1,
      name: 'Brainstorming',
      description:
        'Brainstorming brings team members diverse experience into play.',
    },
    {
      id: 2,
      name: 'Research',
      description:
        'User research helps you to create an optimal product for users.',
    },
    {
      id: 3,
      name: 'Wireframes',
      description:
        'Low fidelity wireframes include the most basic content and visuals.',
    },
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todo, event.previousIndex, event.currentIndex);
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

  addNewTask() {
    if (this.newTaskName && this.newTaskDescription) {
      this.todo.push({
        id: this.todo.length+1,
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
}
