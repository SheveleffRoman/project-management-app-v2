import { Component, DoCheck, OnInit } from '@angular/core';
import {
  Board,
  BoardX,
  BoardXOrder,
  Projects,
  ProjectsX,
  SetBoardsTasks,
  Task,
  TaskService,
  TaskX,
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

  tasksSet: TaskX[] = []; // все таски в проекте
  setTasksByBoards: SetBoardsTasks[] = []; // объединение колонок и тасков

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
      const project = projects.find(
        (project: any) => this.projectName === project.title
      );
      console.log(project);
      this.projectId = project._id;
      console.log(`Project Id:${this.projectId}`);

      // Теперь, когда projectId установлен, можно вызвать getBoards(this.projectId)
      this.getBoards(this.projectId);
      this.getTasksByProject(this.projectId);
    });
  }

  getTasksByProject(id: string) {
    this.taskService.getTasksByProject(id).subscribe((tasks) => {
      this.tasksSet = tasks;
      console.log(this.tasksSet);
      this.combineBoardsAndTasks();
      console.log(this.setTasksByBoards);
    });
  }

  combineBoardsAndTasks() {
    this.setTasksByBoards = this.boards.map((board) => {
      // Фильтруем массив TasksX по columnId, чтобы найти связанные задачи для текущей доски
      const relatedTasks = this.tasksSet.filter(
        (task) => task.columnId === board._id
      );

      // Возвращаем объект, содержащий доску и связанные задачи
      return {
        board: board,
        tasks: relatedTasks,
      };
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

  dropCol(event: CdkDragDrop<BoardX[]>) {
    // console.log(event.container.data.order)
    console.log(this.boards);
    // console.log(this.boards[event.previousIndex].order)

    const boardData: BoardX = {
      title: this.boards[event.previousIndex].title,
      order: event.currentIndex,
    };

    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    console.log(event.container.data)

    this.boards.forEach((board, index) => {
      board.order = index;
      const boardDataLoop: BoardX = {
            title: board.title,
            order: index,
          };
      this.taskService.updateBoardOrder(this.projectId, board._id!, boardDataLoop).subscribe()
    })
  }

  compareBoardsByOrder(a: TaskX, b: TaskX) {
    return a.order - b.order;
  }

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
      // this.boards = columns;
      this.boards = columns.sort(this.compareBoardsByOrder);
      console.log(columns);
    });
  }

  addBoard() {
    const board: BoardX = {
      title: this.newBoardName,
      order: this.boards.length, //переделать для корректной перезаписи порядка после удаления
    };
    this.taskService
      .addBoard(this.projectId, board)
      .subscribe(() => this.findBoardsByProject());
    this.showForm = false;
  }

  onBoardDeleted(boardId: string) {
    // Обновите данные в родительском компоненте
    this.boards = this.boards.filter((board) => board._id !== boardId);
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
