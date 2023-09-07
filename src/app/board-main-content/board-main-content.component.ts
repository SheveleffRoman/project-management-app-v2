import { Component, OnInit } from '@angular/core';
import { Board, Projects, Task, TaskService } from '../task.service';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-main-content',
  templateUrl: './board-main-content.component.html',
  styleUrls: ['./board-main-content.component.scss'],
})
export class BoardMainContentComponent implements OnInit {
  boards!: Board[];

  projectName: string = '';

  newProjectName: string = '';
  isHidden: boolean = false;
  showRenameProjectForm: boolean = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectName = decodeURIComponent(params['projectName']);
    });

    this.getBoards(this.projectName);
    console.log(this.boards);
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
}
