import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../task.service';

@Component({
  selector: 'app-board-main-content',
  templateUrl: './board-main-content.component.html',
  styleUrls: ['./board-main-content.component.scss']
})
export class BoardMainContentComponent implements OnInit{

  boards!: Task[]

  constructor(private taskService: TaskService) {}
  
  ngOnInit(): void {
    this.getBoards()
  }

  getBoards() {
    this.boards = this.taskService.getBoards()
  }

  

}
