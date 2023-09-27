import { Component, DoCheck, OnInit } from '@angular/core';
import {
  Board,
  BoardX,
  Projects,
  ProjectsX,
  Task,
  TaskService,
} from '../task.service';
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

  projectName: string = '';

  login: string | null = '';
  userId: string = '';
  projectId: string = '';

  boards: BoardX[] = [];

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
      this.findBoardsByProject(); // Перенесено сюда, чтобы projectId был установлен перед getBoards
    });
  
    this.login = this.authService.getLogin();
    this.findUserId();

  
    this.prevProjectName = this.projectName;
    console.log(`Project name: ${this.projectName}`);
  }

  ngDoCheck(): void {
    // Сравниваем текущее значение projectName с предыдущим значением
    if (this.projectName !== this.prevProjectName) {
      // Если значение изменилось, выполните здесь необходимые действия
      console.log('projectName изменилось:', this.projectName);
      this.boards = [];
      // this.findBoardsByProject();
      // this.getBoards(this.projectId);
      // другие действия, которые можно выполнить при изменении projectName
      this.prevProjectName = this.projectName; // Обновляем prevProjectName
    }
  }

  findBoardsByProject() {
    this.taskService.getProjectsAll().subscribe((projects) => {
      const project = projects.find((project: any) => this.projectName === project.title);
      console.log(project);
      this.projectId = project._id;
      console.log(`Project Id:${this.projectId}`);
  
      // Теперь, когда projectId установлен, можно вызвать getBoards(this.projectId)
      this.getBoards(this.projectId);
    });
  }

  findUserId() {
    this.authService.getUserAll().subscribe((users) => {
      const user = users.find((user: any) => this.login === user.login);
      if (user) {
        this.userId = user._id;
        console.log(`User Id: ${this.userId}`);
      }
    });
  }

  dropCol(event: CdkDragDrop<BoardX>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
  }

  // dropTasks(event: CdkDragDrop<BoardX>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data.tasks,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data.tasks,
  //       event.container.data.tasks,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }

  showProjectRenameForm() {
    this.showRenameProjectForm = true;
    this.newProjectName = this.projectName;
    this.isHidden = true;

    // this.taskService.getProjectsAll().subscribe((projects) => {
    //   console.log(projects);
    //   const project = projects.find(
    //     (project: any) => this.projectName === project.title
    //   );
    //   console.log(project);
    //   this.projectId = project._id;
    //   console.log(this.projectId);
    // });
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

  getBoards(id: string) {
    this.taskService.getBoardsByProject(id).subscribe((columns) => {
      this.boards = columns;
      console.log(columns)
    });
  }

  addBoard() {
    const board: BoardX = {
      title: this.newBoardName,
      order: this.boards.length,  //переделать для корректной перезаписи порядка после удаления 
    };
    this.taskService.addBoard(this.projectId, board).subscribe(() =>
      this.findBoardsByProject()
    );
    this.showForm = false;
  }

  onBoardDeleted(boardId: string) {
    // Обновите данные в родительском компоненте
    this.boards = this.boards.filter(board => board._id !== boardId);
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
    this.taskService.deleteProject(this.projectId, projectName).subscribe();
  }
}
