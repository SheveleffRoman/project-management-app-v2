import { Component, OnInit } from '@angular/core';
import { Projects, TaskService } from '../task.service';

@Component({
  selector: 'app-snippet-projects',
  templateUrl: './snippet-projects.component.html',
  styleUrls: ['./snippet-projects.component.scss'],
})
export class SnippetProjectsComponent implements OnInit {
  
  constructor(private taskService: TaskService) {}

  snippets!: Projects[];

  showForm: boolean = false;
  newProjectName: string = '';

  ngOnInit(): void {
    this.getSnippets()
  }

  getSnippets() {
    this.snippets = this.taskService.getProjects();
  }

  addProject() {
    this.taskService.addProject(this.newProjectName);
    this.newProjectName = '';
    this.showForm = false;

  }

  openAddProjectForm() {
    this.newProjectName = '';
    this.showForm = true;
  }

  closeAddProjectForm() {
    this.newProjectName = '';
    this.showForm = false;
  }
}
