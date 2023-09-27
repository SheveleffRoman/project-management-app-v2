import { Component, DoCheck, OnInit } from '@angular/core';
import { Board, Projects, ProjectsX, Task, TaskService } from '../task.service';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { FakeAuthService } from '../fake-auth.service';

@Component({
  selector: 'app-board-main-content',
  templateUrl: './board-main-content.component.html',
  styleUrls: ['./board-main-content.component.scss'],
})
export class BoardMainContentComponent implements OnInit, DoCheck {
  boards!: Board[];

  projectName: string = '';

  login: string | null = '';
  userId: string = '';
  projectId: string = '';

  newProjectName: string = '';
  prevProjectName: string = '';
  isHidden: boolean = false;
  showRenameProjectForm: boolean = false;

  showForm: boolean = false;
  newBoardName: string = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: FakeAuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectName = decodeURIComponent(params['projectName']);
    });

    this.login = this.authService.getLogin();

    this.authService.getUserAll().subscribe((users) => {
      const user = users.find((user: any) => this.login === user.login);
      if (user) {
        this.userId = user._id;
        console.log(`User Id: ${this.userId}`);
      }
    });
    this.prevProjectName = this.projectName;
    console.log(this.projectName);
  }

  ngDoCheck(): void {
    // Сравниваем текущее значение projectName с предыдущим значением
    if (this.projectName !== this.prevProjectName) {
      // Если значение изменилось, выполните здесь необходимые действия
      console.log('projectName изменилось:', this.projectName);
      this.getBoards(this.projectName);
      // Выполните здесь другие действия, которые вы хотите выполнить при изменении projectName
      this.prevProjectName = this.projectName; // Обновляем prevProjectName
    }
  }

  getBoards(projectName: string) {
    this.boards = this.taskService.getBoards(projectName);
  }

  dropCol(event: CdkDragDrop<Board>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
  }

  dropTasks(event: CdkDragDrop<Board>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data.tasks,
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  showProjectRenameForm() {
    this.showRenameProjectForm = true;
    this.newProjectName = this.projectName;
    this.isHidden = true;

    this.taskService.getProjectsAll().subscribe((projects) => {
      console.log(projects);
      const project = projects.find(
        (project: any) => this.projectName === project.title
      );
      console.log(project);
      this.projectId = project._id;
      console.log(this.projectId);
    });
  }

  abortRenameProject() {
    this.showRenameProjectForm = false;
    this.isHidden = false;
  }

  clearInput() {
    this.newProjectName = '';
  }

  renameProject() {
    const title = this.newProjectName;

    const projectData: ProjectsX = {
      title: title,
      owner: this.userId,
      users: [''],
    };

    this.taskService
      .updateProjectName(this.projectId, projectData)
      .subscribe((response) => console.log(response));
    this.projectName = this.newProjectName;
    this.newProjectName = '';
    this.isHidden = false;
  }

  addBoard() {
    this.taskService.addBoard(this.projectName, this.newBoardName);
    this.showForm = false;
  }

  showAddForm() {
    this.showForm = true;
    this.newBoardName = '';
  }

  closeAddColForm() {
    this.newBoardName = '';
    this.showForm = false;
  }

  deleteProject(projectName: string) {
    this.taskService.deleteProject(this.projectId ,projectName).subscribe();
    // this.router.navigate(['/projects']);
  }
}
