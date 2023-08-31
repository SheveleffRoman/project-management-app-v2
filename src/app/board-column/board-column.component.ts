import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

export interface Task {
  name: string;
  description: string;
}

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss'],
})

export class BoardColumnComponent {
  
  todo: Task[] = [
    {
      name: 'Brainstorming',
      description:
        'Brainstorming brings team members diverse experience into play.',
    },
    {
      name: 'Research',
      description:
        'User research helps you to create an optimal product for users.',
    },
    {
      name: 'Wireframes',
      description:
        'Low fidelity wireframes include the most basic content and visuals.',
    },
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todo, event.previousIndex, event.currentIndex);
  }
}
