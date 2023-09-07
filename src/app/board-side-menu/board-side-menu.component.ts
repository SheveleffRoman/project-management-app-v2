import { Component, OnInit } from '@angular/core';
import { Projects, TaskService } from '../task.service';

@Component({
  selector: 'app-board-side-menu',
  templateUrl: './board-side-menu.component.html',
  styleUrls: ['./board-side-menu.component.scss']
})
export class BoardSideMenuComponent implements OnInit {

  constructor(private taskSevice: TaskService) {}

  projects!: Projects[];
  projectName!: string;

  ngOnInit(): void {
      this.getProjects();
  }

  getProjects() {
    this.projects = this.taskSevice.getProjects();
  }
}
