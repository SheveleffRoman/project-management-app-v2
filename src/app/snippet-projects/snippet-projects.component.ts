import { Component, OnInit } from '@angular/core';
import { Projects, ProjectsX, TaskService } from '../task.service';
import { FakeAuthService } from '../fake-auth.service';

@Component({
  selector: 'app-snippet-projects',
  templateUrl: './snippet-projects.component.html',
  styleUrls: ['./snippet-projects.component.scss'],
})
export class SnippetProjectsComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private authService: FakeAuthService
  ) {}

  snippets: ProjectsX[] = [];

  login: string | null = '';
  userData: any[] = [];
  options: string[] = [];
  owner: string = '';
  selectedUsers: string[] = [];
  userId: string = '';

  showForm: boolean = false;
  newProjectName: string = '';

  ngOnInit(): void {
    this.getSnippets();
  }

  getSnippets() {
    this.login = this.authService.getLogin();

    this.authService.getUserAll().subscribe(
      (users) => {
        const user = users.find((user: any) => this.login === user.login);
        if (user) {
          this.userId = user._id;
          // Используйте отладочный метод для вывода информации
          this.debugInfo('User found:', user);
          this.taskService.getSetBoards(this.userId).subscribe((set) => {
            // this.snippets = [];
            set.forEach((projectData: any) => {
              const project: ProjectsX = {
                _id: projectData._id,
                title: projectData.title,
                owner: '',
                users: [],
              };
      
              this.snippets.push(project);
            });
          });
        }
      },
      (error) => {
        // Обработка ошибок и вывод информации
        this.debugInfo('Error occurred:', error);
      }
    );
  }

  debugInfo(message: string, data: any): void {
    console.log(message, data);
  }

  // addProject() {
  //   this.taskService.addProject(this.newProjectName);
  //   this.newProjectName = '';
  //   this.showForm = false;
  // }

  openAddProjectForm() {
    this.newProjectName = '';
    this.showForm = true;
  }

  closeAddProjectForm() {
    this.newProjectName = '';
    this.showForm = false;
  }

  addProject() {
    const title = this.newProjectName;

    // const ownerUser = this.userData.find((user) => user.login === this.login);

      this.owner = this.userId

    // const selectedUsersIds = this.boardsData
    //   .get('selectedUsers')
    //   ?.value.map((selectedLogin: string) => {
    //     const user = this.userData.find((user) => user.login === selectedLogin);
    //     return user ? user._id : '';
    //   });

    const boardData = {
      title: title,
      owner: this.owner,
      users: [''],
    };

    this.taskService.createProject(boardData).subscribe((response) => {
      if (response) {
        // После успешного создания проекта вызываем метод для обновления данных
        console.log(response);
      }
    });
    this.newProjectName = '';
    this.showForm = false;
  }
}
