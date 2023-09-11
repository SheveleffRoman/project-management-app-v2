import { Component, DoCheck, OnInit } from '@angular/core';
import { Board, Projects, Task, TaskService } from '../task.service';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-board-main-content',
  templateUrl: './board-main-content.component.html',
  styleUrls: ['./board-main-content.component.scss'],
})
export class BoardMainContentComponent implements OnInit, DoCheck {
  boards!: Board[];

  projectName: string = '';

  newProjectName: string = '';
  prevProjectName: string = '';
  isHidden: boolean = false;
  showRenameProjectForm: boolean = false;

  showForm: boolean = false;
  newBoardName: string = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectName = decodeURIComponent(params['projectName']);
    });

    this.prevProjectName = this.projectName; 
    this.getBoards(this.projectName);
    console.log(this.boards);
  }

  ngDoCheck(): void {
    // Сравниваем текущее значение projectName с предыдущим значением
    if (this.projectName !== this.prevProjectName) {
      // Если значение изменилось, выполните здесь необходимые действия
      console.log('projectName изменилось:', this.projectName);
      this.getBoards(this.projectName)
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
  }

  abortRenameProject() {
    this.showRenameProjectForm = false;
    this.isHidden = false;
  }

  clearInput() {
    this.newProjectName = '';
  }

  renameProject() {
    if (this.newProjectName) {
      this.taskService.updateProjectName(this.projectName, this.newProjectName);
      this.projectName = this.newProjectName;
      this.newProjectName = '';
      this.isHidden = false;
      // console.log(this.projectName);
    }
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
    this.taskService.deleteProject(projectName);
    this.router.navigate(['/projects']);
  }
}
