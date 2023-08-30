import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';


@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
})
export class BoardTaskComponent {
  
  selectedPriority: string = 'low';

  
  todo = ['Get to work'];

  done = ['Get up', 'Brush teeth'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
