import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

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
  
  todo = [
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
    if (event.previousContainer === event.container) {
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
    }
  }
}
