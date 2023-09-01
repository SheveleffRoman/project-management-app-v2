import { Component, Input } from '@angular/core';
import { Task } from '../task.service';



@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss'],
})
export class BoardTaskComponent {

  selectedPriority: string = 'low';

  @Input() task!: Task;
  @Input() index!: number;
  
}
